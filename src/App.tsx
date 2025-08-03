import { useEffect, useRef, useState } from "react";
import "./App.css";

import { MessageSystem } from "./features/playground/messagerSystem";
import { Message } from "./features/playground/messageGameComponent";
import { ECS } from "./features/playground/ecs";

function App() {
  const ecsRef = useRef<ECS | null>(null);

  const [tick, setTick] = useState(0);

  useEffect(() => {
    const ecs = new ECS();
    ecsRef.current = ecs;

    const messageSystem = new MessageSystem();
    ecs.addSystem(messageSystem);

    const messageGameObject1 = ecs.addGameObject();
    const messageGameObject2 = ecs.addGameObject();

    ecs.addComponent(messageGameObject1, new Message("Hello World"));
    ecs.addComponent(messageGameObject2, new Message("Hello World from 2"));

    return () => {
      ecsRef.current = null;
    };
  }, []);

  useEffect(() => {
    const ecs = ecsRef.current;
    if (!ecs) return;

    let animationFrameId: number;

    const gameLoop = () => {
      ecs.update();
      setTick((t) => t + 1);
      animationFrameId = requestAnimationFrame(gameLoop);
    };

    animationFrameId = requestAnimationFrame(gameLoop);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const ecs = ecsRef.current;
  if (!ecs) return <div>Loading....</div>;

  return (
    <div>
      <h1>ECS APP</h1>
      <div>loop: {tick}</div>
    </div>
  );
}

export default App;
