import { Advance, Barbarians, City, Gold, Unit } from '../GoodyHuts';
import {
  Desert,
  Grassland,
  Plains,
  River,
} from '@civ-clone/civ1-world/Terrains';
import { Horseman, Swordman } from '@civ-clone/civ1-unit/Units';
import ActionRule from '@civ-clone/core-goody-hut/Rules/Action';
import BarbariansRule from '../Rules/GoodyHut/Barbarians';
import Built from '@civ-clone/core-world/Rules/Built';
import CityRegistry from '@civ-clone/core-city/CityRegistry';
import Discovered from '@civ-clone/core-goody-hut/Rules/Discovered';
import Effect from '@civ-clone/core-rule/Effect';
import Engine from '@civ-clone/core-engine/Engine';
import Food from '@civ-clone/base-terrain-yield-food/Food';
import GoodyHut from '@civ-clone/core-goody-hut/GoodyHut';
import GoodyHutAction from '@civ-clone/core-goody-hut/Action';
import GoodyHutRegistry from '@civ-clone/core-goody-hut/GoodyHutRegistry';
import Moved from '@civ-clone/core-unit/Rules/Moved';
import Player from '@civ-clone/core-player/Player';
import PlayerResearchRegistry from '@civ-clone/core-science/PlayerResearchRegistry';
import PlayerUnit from '@civ-clone/core-unit/Unit';
import Production from '@civ-clone/base-terrain-yield-production/Production';
import RuleRegistry from '@civ-clone/core-rule/RuleRegistry';
import Terrain from '@civ-clone/core-terrain/Terrain';
import Tile from '@civ-clone/core-world/Tile';
import Trade from '@civ-clone/base-terrain-yield-trade/Trade';
import UnitRule from '@civ-clone/base-goody-hut-unit/Rules/Unit';
import World from '@civ-clone/core-world/World';
import action, {
  BARBARIANS_FROM_CITIES,
  unleashesBarbarians,
} from '../Rules/GoodyHut/action';
import actionPerformed from '../Rules/GoodyHut/action-performed';
import built from '../Rules/World/built';
import discovered from '../Rules/GoodyHut/discovered';
import distribution from '../Rules/GoodyHut/distribution';
import { expect } from 'chai';
import moved from '../Rules/Unit/moved';
import unit from '../Rules/GoodyHut/unit';
import Barbarian from '@civ-clone/base-civilization-barbarian/Barbarian';

const sequence = (...values: number[]) => {
  const drawn: number[] = [];

  return {
    drawn,
    rng: (): number => {
      const value = values.shift();

      if (value === undefined) {
        throw new Error('drew too many numbers');
      }

      drawn.push(value);

      return value;
    },
  };
};

const playerOf = (barbarian = false): Player =>
  ({
    civilization: () => (barbarian ? new Barbarian() : {}),
  } as unknown as Player);

describe('civ1-goody-hut', (): void => {
  describe('distribution, when the world is built', (): void => {
    it('puts a hut on land with no hut within 3, on a 1 in 20 roll drawn only for squares that pass the rest', (): void => {
      const goodyHutRegistry = new GoodyHutRegistry(),
        ruleRegistry = new RuleRegistry(),
        { drawn, rng } = sequence(0.04, 0.05, 0.01),
        radii: number[] = [],
        tiles: Tile[] = [],
        tile = (land: boolean, near: () => Tile[] = () => []): Tile =>
          ({
            isLand: () => land,
            getSurroundingArea: (radius: number) => {
              radii.push(radius);

              return near();
            },
          } as unknown as Tile);

      tiles.push(
        tile(true),
        tile(false),
        tile(true),
        tile(true, () => [tiles[0]]),
        tile(true)
      );

      ruleRegistry.register(
        ...distribution(goodyHutRegistry, rng),
        ...built(goodyHutRegistry, ruleRegistry)
      );

      ruleRegistry.process(Built, {
        forEach: (callback: (tile: Tile) => void) => tiles.forEach(callback),
      } as unknown as World);

      expect(goodyHutRegistry.entries().map((hut) => hut.tile())).to.deep.equal(
        [tiles[0], tiles[4]]
      );
      // tiles[1] is sea, and tiles[3] is next to tiles[0]'s hut: no roll for either.
      expect(drawn).to.deep.equal([0.04, 0.05, 0.01]);
      expect(radii).to.deep.equal([3, 3, 3, 3]);
    });
  });

  describe('when a unit moves', (): void => {
    it('opens the hut on its square, unless it is a barbarian', (): void => {
      const goodyHutRegistry = new GoodyHutRegistry(),
        ruleRegistry = new RuleRegistry(),
        square = {} as Tile,
        empty = {} as Tile,
        opened: PlayerUnit[] = [],
        hut = new GoodyHut(square, ruleRegistry),
        unitOn = (tile: Tile, barbarian = false): PlayerUnit =>
          ({
            player: () => playerOf(barbarian),
            tile: () => tile,
          } as unknown as PlayerUnit);

      goodyHutRegistry.register(hut);
      ruleRegistry.register(
        ...moved(goodyHutRegistry),
        new Discovered(
          new Effect((goodyHut: GoodyHut, discoverer: PlayerUnit): void => {
            expect(goodyHut).to.equal(hut);
            opened.push(discoverer);
          })
        )
      );

      const barbarian = unitOn(square, true),
        elsewhere = unitOn(empty),
        explorer = unitOn(square);

      [barbarian, elsewhere, explorer].forEach((movedUnit) =>
        ruleRegistry.process(Moved, movedUnit, 'n' as any)
      );

      expect(opened).to.deep.equal([explorer]);
    });
  });

  describe('when a hut is discovered', (): void => {
    it('removes it, performs one of its actions at random, then tells the listeners', (): void => {
      const goodyHutRegistry = new GoodyHutRegistry(),
        ruleRegistry = new RuleRegistry(),
        engine = new Engine(),
        events: string[] = [],
        explorer = {} as PlayerUnit,
        hut = new GoodyHut({} as Tile, ruleRegistry);

      class Logged extends GoodyHutAction {
        private _name: string;

        constructor(name: string) {
          super(hut, explorer);

          this._name = name;
        }

        perform(): void {
          events.push(
            `${this._name} (registered: ${goodyHutRegistry.includes(hut)})`
          );
        }
      }

      goodyHutRegistry.register(hut);
      engine.on('goody-hut:discovered', (goodyHut, discoverer) =>
        events.push(`discovered ${goodyHut === hut} ${discoverer === explorer}`)
      );
      engine.on('goody-hut:action-performed', (goodyHut, performed) =>
        events.push(
          `performed ${goodyHut === hut} ${performed.constructor.name}`
        )
      );

      ruleRegistry.register(
        ...discovered(goodyHutRegistry, engine, sequence(0.7).rng),
        ...actionPerformed(engine),
        new ActionRule(new Effect(() => new Logged('first'))),
        new ActionRule(new Effect(() => new Logged('second'))),
        new ActionRule(new Effect(() => new Logged('third')))
      );

      hut.process(explorer);

      expect(events).to.deep.equal([
        'performed true Logged',
        'third (registered: false)',
        'discovered true true',
      ]);
    });
  });

  describe('what a hut offers', (): void => {
    const setUp = ({
      terrain = new Grassland() as Terrain,
      score = 150,
      citiesNear = false,
      available = [] as { repeatable?: boolean }[],
    } = {}) => {
      const ruleRegistry = new RuleRegistry(),
        player = playerOf(),
        scored: [unknown, unknown][] = [],
        areas: number[] = [],
        hutTile = {
          terrain: () => terrain,
          getSurroundingArea: (radius?: number) => {
            areas.push(radius as number);

            return Object.assign(radius === 4 ? [{}, {}] : [], {
              score: (scorer: unknown, weights: unknown) => {
                scored.push([scorer, weights]);

                return score;
              },
            });
          },
          distanceFrom: () => 10,
        } as unknown as Tile,
        hut = new GoodyHut(hutTile, ruleRegistry),
        explorer = { player: () => player } as unknown as PlayerUnit,
        playerResearchRegistry = {
          getByPlayer: () => ({ available: () => available }),
        } as unknown as PlayerResearchRegistry,
        cityRegistry = {
          getByPlayer: () => [],
          getByTile: () => (citiesNear ? {} : null),
          entries: () => [],
        } as unknown as CityRegistry;

      ruleRegistry.register(
        ...action(playerResearchRegistry, cityRegistry, ruleRegistry)
      );

      return {
        areas,
        offered: (): string[] =>
          hut.actions(explorer).map((offer) => offer.constructor.name),
        scored,
      };
    };

    it('offers an advance, a city, gold and mercenaries on a good site', (): void => {
      const { areas, offered, scored } = setUp({ available: [{}] });

      expect(offered()).to.deep.equal(['Advance', 'City', 'Gold', 'Unit']);
      expect(scored).to.deep.equal([
        [
          null,
          [
            [Food, 8],
            [Production, 3],
            [Trade, 1],
          ],
        ],
      ]);
      expect(areas).to.deep.equal([undefined, 4]);
    });

    it('never offers a repeatable advance', (): void => {
      expect(
        setUp({ available: [{ repeatable: true }] }).offered()
      ).to.deep.equal(['City', 'Gold', 'Unit']);
    });

    it('offers a city only on Grassland, Plains or River, scoring 150 or more, with no city within 4', (): void => {
      expect(setUp({ terrain: new Plains() }).offered()).to.include('City');
      expect(setUp({ terrain: new River() }).offered()).to.include('City');
      expect(setUp({ terrain: new Desert() }).offered()).to.not.include('City');
      expect(setUp({ score: 149 }).offered()).to.not.include('City');
      expect(setUp({ citiesNear: true }).offered()).to.not.include('City');
    });
  });

  describe('barbarians or mercenaries', (): void => {
    const hutAt = (distances: number[], ownCities: number) => {
      const player = playerOf(),
        hutTile = {} as Tile,
        cities = distances.map((distance, index) => ({
          destroyed: () => index === 0 && distance < 0,
          tile: () => ({
            distanceFrom: (other: Tile) => {
              expect(other).to.equal(hutTile);

              return Math.abs(distance);
            },
          }),
        })),
        cityRegistry = {
          entries: () => cities,
          getByPlayer: () => new Array(ownCities).fill({}),
        } as unknown as CityRegistry;

      return unleashesBarbarians(
        { tile: () => hutTile } as unknown as GoodyHut,
        { player: () => player } as unknown as PlayerUnit,
        cityRegistry
      );
    };

    it('unleashes barbarians once the player has a city and no standing city is within 4', (): void => {
      expect(BARBARIANS_FROM_CITIES).to.equal(4);
      expect(hutAt([4, 9], 1)).true;
      expect(hutAt([3, 9], 1)).false;
      expect(hutAt([-3, 9], 1)).true;
      expect(hutAt([9], 0)).false;
      expect(hutAt([], 1)).true;
    });

    it('offers Barbarians, which raise the horde through the Barbarians rule, or a Unit', (): void => {
      const ruleRegistry = new RuleRegistry(),
        player = playerOf(),
        hutTile = { terrain: () => new Desert() } as unknown as Tile,
        hut = new GoodyHut(hutTile, ruleRegistry),
        explorer = { player: () => player } as unknown as PlayerUnit,
        raised: [GoodyHut, PlayerUnit][] = [];
      let ownCities = 1;

      const cityRegistry = {
        entries: () => [],
        getByPlayer: () => new Array(ownCities).fill({}),
        getByTile: () => null,
      } as unknown as CityRegistry;

      ruleRegistry.register(
        ...action(
          {
            getByPlayer: () => ({ available: () => [] }),
          } as unknown as PlayerResearchRegistry,
          cityRegistry,
          ruleRegistry
        ),
        new BarbariansRule(
          new Effect((goodyHut: GoodyHut, raiser: PlayerUnit): void => {
            raised.push([goodyHut, raiser]);
          })
        )
      );

      const [last] = ruleRegistry
        .process(ActionRule, hut, explorer)
        .slice(-1) as GoodyHutAction[];

      expect(last).to.be.instanceOf(Barbarians);

      last.perform();

      expect(raised).to.deep.equal([[hut, explorer]]);

      ownCities = 0;

      expect(
        ruleRegistry.process(ActionRule, hut, explorer).slice(-1)[0]
      ).to.be.instanceOf(Unit);
      expect([Advance, City, Gold].every((Type) => typeof Type === 'function'))
        .true;
    });
  });

  describe('mercenaries', (): void => {
    it('are a Horseman or a Swordman at random, for the player, on the square', (): void => {
      const ruleRegistry = new RuleRegistry(),
        player = playerOf(),
        square = {} as Tile,
        explorer = {
          player: () => player,
          tile: () => square,
        } as unknown as PlayerUnit,
        { drawn, rng } = sequence(0.49, 0.5);

      ruleRegistry.register(...unit(new GoodyHutRegistry(), rng, ruleRegistry));

      const [first] = ruleRegistry.process(UnitRule, {} as GoodyHut, explorer),
        [second] = ruleRegistry.process(UnitRule, {} as GoodyHut, explorer);

      expect(first).to.be.instanceOf(Horseman);
      expect(second).to.be.instanceOf(Swordman);
      expect(first.player()).to.equal(player);
      expect(first.tile()).to.equal(square);
      expect(first.city()).to.equal(null);
      expect(drawn).to.deep.equal([0.49, 0.5]);
    });
  });
});
