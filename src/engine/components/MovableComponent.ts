import { Component } from "../ecs";

export class MovableComponent extends Component {
  speed: number;
  constructor(speed: number = 5) {
    super();
    this.speed = speed;
  }
}