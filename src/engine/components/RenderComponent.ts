import { Component } from "../ecs";

export class RenderComponent extends Component {
  radius: number;
  color: string;
  constructor(radius: number = 20, color: string = "blue") {
    super();
    this.radius = radius;
    this.color = color;
  }
}