import { Health } from "./health";
import { System } from "./system";
import type { GameObject } from "./type";

export class Damager extends System {
  componentsRequired = new Set<Function>([Health]);

  public gameObjectsSeenLastUpdate: number = -1;

  update(gameObjects: Set<GameObject>): void {
    this.gameObjectsSeenLastUpdate = gameObjects.size;
  }
}
