import { Component } from "./component";

export class Health extends Component {
  public _maximum: number;
  public _current: number;

  constructor(maximum: number, current: number) {
    super();
    this._maximum = maximum;
    this._current = current;
  }
}
