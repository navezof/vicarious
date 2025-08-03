import React from "react";
import { type Entity } from "../../../engine/ecs";

export type EnemyEntityProps = {
  entity: Entity;
  x: number;
  y: number;
  radius: number;
  color: string;
};

export const EnemyEntity: React.FC<EnemyEntityProps> = ({ entity, x, y, radius, color }) => {
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
        border: "2px solid darkred",
        boxShadow: "0 0 10px rgba(255, 0, 0, 0.5)"
      }}
      title={`Enemy Entity ${entity}`}
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
        E
      </div>
      <div style={{
        position: "absolute",
        top: "30%",
        left: "30%",
        width: "6px",
        height: "6px",
        backgroundColor: "red",
        borderRadius: "50%"
      }} />
      <div style={{
        position: "absolute",
        top: "30%",
        right: "30%",
        width: "6px",
        height: "6px",
        backgroundColor: "red",
        borderRadius: "50%"
      }} />
    </div>
  );
};