import { System, type Entity } from "../ecs";
import { PositionComponent, MovableComponent, AIComponent } from "../components";

export class AISystem extends System {
  public componentsRequired = new Set([PositionComponent, MovableComponent, AIComponent]);
  private gameAreaWidth = 800;
  private gameAreaHeight = 600;

  public update(entities: Set<Entity>): void {
    for (let entity of entities) {
      const position = this.ecs.getComponents(entity).get(PositionComponent);
      const movable = this.ecs.getComponents(entity).get(MovableComponent);
      const ai = this.ecs.getComponents(entity).get(AIComponent);

      if (ai.type === "random") {
        this.updateRandomMovement(position, movable, ai);
      }
    }
  }

  private updateRandomMovement(position: PositionComponent, movable: MovableComponent, ai: AIComponent): void {
    // Change direction every 60 frames (roughly 1 second at 60fps)
    ai.changeDirectionTimer++;
    
    if (ai.changeDirectionTimer >= 60) {
      ai.changeDirectionTimer = 0;
      // Random direction: -1, 0, or 1 for both x and y
      ai.currentDirection = {
        x: Math.floor(Math.random() * 3) - 1, // -1, 0, 1
        y: Math.floor(Math.random() * 3) - 1, // -1, 0, 1
      };
    }

    // Apply movement
    const newX = position.x + (ai.currentDirection.x * movable.speed);
    const newY = position.y + (ai.currentDirection.y * movable.speed);

    // Keep enemy within bounds (with some margin for radius)
    const margin = 25;
    if (newX >= margin && newX <= this.gameAreaWidth - margin) {
      position.x = newX;
    } else {
      // Reverse direction if hitting boundary
      ai.currentDirection.x *= -1;
    }

    if (newY >= margin && newY <= this.gameAreaHeight - margin) {
      position.y = newY;
    } else {
      // Reverse direction if hitting boundary
      ai.currentDirection.y *= -1;
    }
  }
}