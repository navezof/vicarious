import { Health } from "./health";
import { System } from "./system";
import type { GameObject } from "./type";

export class Destroyer extends System {
  public componentsRequired = new Set<Function>([Health]);

  public gameObjectsSeenLastUpdate: number = -1;

  update(gameObjects: Set<GameObject>): void {
    this.gameObjectsSeenLastUpdate = gameObjects.size;
  }
}
