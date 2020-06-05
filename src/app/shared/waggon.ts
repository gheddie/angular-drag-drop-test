import {Track} from './track';

export class Waggon {

  waggonNumber: string;

  x: number;

  y: number;

  index: number;

  renderingLength: number;

  public track: Track;

  public selected: boolean = false;

  constructor(aWaggonNumber: string, aRenderingLength: number) {
    this.waggonNumber = aWaggonNumber;
    this.renderingLength = aRenderingLength;
  }

  toggleSelection() {
    this.selected = !this.selected;
  }
}
