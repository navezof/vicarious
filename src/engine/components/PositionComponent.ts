import { Component } from "../ecs";

export class PositionComponent extends Component {
  x: number = 0;
  y: number = 0;
  constructor(x: number = 0, y: number = 0) {
    super();
    this.x = x;
    this.y = y;
  }
}