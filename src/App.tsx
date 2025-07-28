import "./App.css";
import { Damager } from "./features/damager";
import { ECS } from "./features/ecs";
import { Health } from "./features/health";
import { HealthBarRenderer } from "./features/HealthBarRenderer";
import { Locator } from "./features/locator";
import { Position } from "./features/position";

function App() {
  console.log("Running basic test");
  const ecs = new ECS();

  const gameObject1 = ecs.addGameObject();
  const position1 = new Position(5, 5);
  ecs.addComponent(gameObject1, position1);
  console.log(
    ecs.getComponents(gameObject1)?.has(Position),
    "-- component adding"
  );

  // On vérifie si la position définit du composant est la même
  // que la position du composant dans le gameObject
  const GOPosition = ecs.getComponents(gameObject1)?.get(Position);
  console.log(
    GOPosition?.x == position1.x && GOPosition?.y == position1.y,
    "-- component retrieval"
  );

  ecs.removeComponent(gameObject1, Position);
  console.log(
    !ecs.getComponents(gameObject1)?.has(Position),
    "-- component deletion"
  );

  /// BASIC SYSTEM TEST

  const locator = new Locator();
  ecs.addSystem(locator);
  ecs.update();
  console.log(
    locator.gameObjectsSeenLastUpdate == 0,
    "-- system doesn't track w/o a match"
  );

  ecs.addComponent(gameObject1, position1);
  ecs.update();
  console.log(
    locator.gameObjectsSeenLastUpdate == 1,
    "-- system tracks with a match"
  );
  ecs.removeComponent(gameObject1, Position);
  ecs.update();
  console.log(
    locator.gameObjectsSeenLastUpdate == 0,
    "-- system removes tracking w/o a match"
  );

  const health1 = new Health(10, 10);
  ecs.addComponent(gameObject1, position1);
  ecs.addComponent(gameObject1, health1);
  ecs.update();

  console.log(
    locator.gameObjectsSeenLastUpdate == 1,
    "-- system does track w/ superset"
  );

  const damager = new Damager();
  ecs.addSystem(damager);

  const healthBarRenderer = new HealthBarRenderer();
  ecs.addSystem(healthBarRenderer);

  const gameObject2 = ecs.addGameObject();
  const health2 = new Health(15, 15);
  ecs.addComponent(gameObject2, health2);

  ecs.update();

  console.log(
    locator.gameObjectsSeenLastUpdate == 1,
    "-- Locator tracking 1 GO"
  );

  console.log(
    damager.gameObjectsSeenLastUpdate == 2,
    "-- Damager tracking 2 GO"
  );

  console.log(
    healthBarRenderer.gameObjectsSeenLastUpdate == 1,
    "-- HealthBarRendered tracking 1 GO"
  );

  return <></>;
}

export default App;
