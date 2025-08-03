import React from "react";
import { type Entity } from "../../../engine/ecs";

export type PlayerEntityProps = {
  entity: Entity;
  x: number;
  y: number;
  radius: number;
  color: string;
};

export const PlayerEntity: React.FC<PlayerEntityProps> = ({ entity, x, y, radius, color }) => {
  return (
    <div 
      style={{ 
        borderRadius: radius,
        position: "absolute", 
        top: y - radius,
        left: x - radius,
        width: radius * 2, 
        height: radius * 2, 
        backgroundColor: color,
        border: "2px solid darkblue"
      }}
      title={`Player Entity ${entity}`}
    >
      <div style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        fontSize: "10px",
        color: "white",
        fontWeight: "bold"
      }}>
        P
      </div>
    </div>
  );
};