import { Component } from "../ecs";

export class RenderableComponent extends Component {
  type: string;
  constructor(type: string) {
    super();
    this.type = type;
  }
}