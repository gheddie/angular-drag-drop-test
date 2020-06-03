export class Waggon {

  waggonNumber: string;

  x: number;

  y: number;

  trackNumber: string;

  index: number;

  renderingLength: number;

  constructor(aWaggonNumber: string, aX: number, aY: number, aTrackNumber: string, aIndex: number, aRenderingLength: number) {
    this.waggonNumber = aWaggonNumber;
    this.x = aX;
    this.y = aY;
    this.trackNumber = aTrackNumber;
    this.index = aIndex;
    this.renderingLength = aRenderingLength;
  }
}
