import {Track} from './track';

export class Waggon {

  waggonNumber: string;

  x: number;

  y: number;

  index: number;

  renderingLength: number;

  public track: Track;

  constructor(aWaggonNumber: string, aRenderingLength: number) {
    this.waggonNumber = aWaggonNumber;
    this.renderingLength = aRenderingLength;
  }
}
