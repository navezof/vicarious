import { Health } from "./health";
import { Position } from "./position";
import { System } from "./system";
import type { GameObject } from "./type";

export class HealthBarRenderer extends System {
  public componentsRequired = new Set<Function>([Position, Health]);

  public gameObjectsSeenLastUpdate: number = -1;

  update(gameObjects: Set<GameObject>): void {
    this.gameObjectsSeenLastUpdate = gameObjects.size;
  }
}
