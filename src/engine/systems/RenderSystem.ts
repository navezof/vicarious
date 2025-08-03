import { System, type Entity } from "../ecs";
import { PositionComponent, RenderComponent, RenderableComponent } from "../components";

export type RenderableEntityData = {
  entity: Entity;
  type: string;
  x: number;
  y: number;
  radius: number;
  color: string;
};

export class RenderSystem extends System {
  public componentsRequired = new Set([PositionComponent, RenderComponent, RenderableComponent]);
  public onRenderUpdate: ((entities: Array<RenderableEntityData>) => void) | null = null;

  public update(entities: Set<Entity>): void {
    if (!this.onRenderUpdate) return;

    const renderData = Array.from(entities).map(entity => {
      const position = this.ecs.getComponents(entity).get(PositionComponent);
      const render = this.ecs.getComponents(entity).get(RenderComponent);
      const renderable = this.ecs.getComponents(entity).get(RenderableComponent);
      
      return {
        entity,
        type: renderable.type,
        x: position.x,
        y: position.y,
        radius: render.radius,
        color: render.color
      };
    });

    this.onRenderUpdate(renderData);
  }
}