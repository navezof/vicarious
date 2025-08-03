
import { useEffect, useRef, useState } from "react";
import { ECS } from "../../engine/ecs";
import { MovementSystem, RenderSystem, ColorChangeSystem, AISystem, type RenderableEntityData } from "../../engine/systems";
import { PositionComponent, RenderComponent, MovableComponent, RenderableComponent, AIComponent } from "../../engine/components";
import { EntityRenderers } from "./entities";
import { useGameInput } from "./useGameInput";

export const Playground = () => {
  const ecsRef = useRef<ECS | null>(null);
  const movementSystemRef = useRef<MovementSystem | null>(null);
  const colorSystemRef = useRef<ColorChangeSystem | null>(null);
  const [entities, setEntities] = useState<RenderableEntityData[]>([]);
  const inputState = useGameInput();

  useEffect(() => {
    const ecs = new ECS();
    ecsRef.current = ecs;

    const movementSystem = new MovementSystem();
    const renderSystem = new RenderSystem();
    const colorChangeSystem = new ColorChangeSystem();
    const aiSystem = new AISystem();
    
    movementSystemRef.current = movementSystem;
    colorSystemRef.current = colorChangeSystem;
    
    renderSystem.onRenderUpdate = (renderData) => {
      setEntities([...renderData]);
    };

    ecs.addSystem(movementSystem);
    ecs.addSystem(renderSystem);
    ecs.addSystem(colorChangeSystem);
    ecs.addSystem(aiSystem);

    const player = ecs.addEntity();
    ecs.addComponent(player, new PositionComponent(200, 200));
    ecs.addComponent(player, new RenderComponent(25, "blue"));
    ecs.addComponent(player, new MovableComponent(3));
    ecs.addComponent(player, new RenderableComponent("player"));

    // Créer un enemy avec IA
    const enemy = ecs.addEntity();
    ecs.addComponent(enemy, new PositionComponent(600, 400));
    ecs.addComponent(enemy, new RenderComponent(20, "red"));
    ecs.addComponent(enemy, new MovableComponent(2));
    ecs.addComponent(enemy, new RenderableComponent("enemy"));
    ecs.addComponent(enemy, new AIComponent("random"));

    const gameLoop = () => {
      ecs.update();
      requestAnimationFrame(gameLoop);
    };
    
    requestAnimationFrame(gameLoop);
  }, []);

  useEffect(() => {
    if (movementSystemRef.current) {
      movementSystemRef.current.setInputState(inputState);
    }
    if (colorSystemRef.current) {
      colorSystemRef.current.setInputState(inputState);
    }
  }, [inputState]);

  return (
    <div style={{position: "relative", width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
      <div>
        <h4> ZQSD pour bouger, ESPACE pour changer couleur, E pour échanger de couleur</h4>
      </div>
      <div style={{position: "relative", width: "800px", height: "600px", border: "1px solid black" }}>
        {entities.map((entityData) => {
          const EntityComponent = EntityRenderers[entityData.type as keyof typeof EntityRenderers];

          if (!EntityComponent) {
            console.warn(`No renderer found for entity type: ${entityData.type}`);
            return null;
          }

          return (
            <EntityComponent
              key={entityData.entity}
              entity={entityData.entity}
              x={entityData.x}
              y={entityData.y}
              radius={entityData.radius}
              color={entityData.color}
            />
          );
        })}
      </div>
    </div>
  );
};