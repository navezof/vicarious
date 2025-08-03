import { GameComponent } from "./gameComponent";

export class Message extends GameComponent {
  public message: string;

  constructor(message: string) {
    super();
    this.message = message;
  }
}
