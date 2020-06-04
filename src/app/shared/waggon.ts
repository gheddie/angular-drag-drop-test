import {Track} from './track';

export class Waggon {

  waggonNumber: string;

  x: number;

  y: number;

  trackNumber: string;

  index: number;

  renderingLength: number;

  public track: Track;

  constructor(aWaggonNumber: string, aX: number, aY: number, aTrackNumber: string, aIndex: number, aRenderingLength: number) {
    this.waggonNumber = aWaggonNumber;
    this.x = aX;
    this.y = aY;
    this.trackNumber = aTrackNumber;
    this.index = aIndex;
    this.renderingLength = aRenderingLength;
  }
}
