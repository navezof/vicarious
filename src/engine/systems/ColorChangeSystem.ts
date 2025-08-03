import { System, type Entity } from "../ecs";
import { RenderComponent } from "../components";
import { type InputState } from "./InputState";

export class ColorChangeSystem extends System {
  public componentsRequired = new Set([RenderComponent]);
  private inputState: InputState = { up: false, down: false, left: false, right: false, space: false };
  private spaceWasPressed = false;
  private colors = ["blue", "red", "green", "yellow", "purple", "orange"];
  private currentColorIndex = 0;

  public setInputState(inputState: InputState): void {
    const spaceJustPressed = inputState.space && !this.spaceWasPressed;
    
    if (spaceJustPressed) {
      this.currentColorIndex = (this.currentColorIndex + 1) % this.colors.length;
      this.changeEntityColors();
    }
    
    this.spaceWasPressed = inputState.space;
    this.inputState = inputState;
  }

  private changeEntityColors(): void {
    const newColor = this.colors[this.currentColorIndex];
    
    for (let entity of this.ecs.systems.get(this) || new Set()) {
      const renderComponent = this.ecs.getComponents(entity).get(RenderComponent);
      renderComponent.color = newColor;
    }
  }

  public update(entities: Set<Entity>): void {
    // Ce système réagit aux inputs, pas au cycle d'update
  }
}