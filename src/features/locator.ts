import { Position } from "./position";
import { System } from "./system";
import type { GameObject } from "./type";

export class Locator extends System {
  componentsRequired = new Set<Function>([Position]);
  public gameObjectsSeenLastUpdate: number = -1;

  update(gameObjects: Set<GameObject>): void {
    this.gameObjectsSeenLastUpdate = gameObjects.size;
  }
}
