import { System } from "./system";
import { Message } from "./messageGameComponent";
import type { GameObject } from "./type";

export class MessageSystem extends System {
  public gameComponentsRequired = new Set<Function>([Message]);

  public update(gameObjects: Set<GameObject>): void {
    for (const gameObject of gameObjects) {
      const message = this.ecs.getComponents(gameObject)?.get(Message);
      console.log(message?.message);
    }
  }
}
