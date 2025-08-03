import { System, type Entity } from "../ecs";
import { PositionComponent, MovableComponent } from "../components";
import { type InputState } from "./InputState";

export class MovementSystem extends System {
  public componentsRequired = new Set([PositionComponent, MovableComponent]);
  private inputState: InputState = { up: false, down: false, left: false, right: false, space: false };

  public setInputState(inputState: InputState): void {
    this.inputState = inputState;
  }

  public update(entities: Set<Entity>): void {
    for (let entity of entities) {
      const position = this.ecs.getComponents(entity).get(PositionComponent);
      const movable = this.ecs.getComponents(entity).get(MovableComponent);

      if (this.inputState.up) {
        position.y -= movable.speed;
      }
      if (this.inputState.down) {
        position.y += movable.speed;
      }
      if (this.inputState.left) {
        position.x -= movable.speed;
      }
      if (this.inputState.right) {
        position.x += movable.speed;
      }
    }
  }
}