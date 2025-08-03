import { Component } from "../ecs";

export class AIComponent extends Component {
  type: string;
  changeDirectionTimer: number;
  currentDirection: { x: number; y: number };
  
  constructor(type: string = "random") {
    super();
    this.type = type;
    this.changeDirectionTimer = 0;
    this.currentDirection = { x: 0, y: 0 };
  }
}