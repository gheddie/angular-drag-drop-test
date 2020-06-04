import {Waggon} from './waggon';

export class Track {

  trackNumber: string;

  xFrom: number;

  yFrom: number;

  xTo: number;

  yTo: number;

  index: number;

  waggons: Waggon[];

  lenght: number;

  constructor(aTrackNumber: string, axFrom: number, ayFrom: number, axTo: number, ayTo: number, aIndex: number, aWaggons: Waggon[], aLenght: number) {
    this.trackNumber = aTrackNumber;
    this.xFrom = axFrom;
    this.yFrom = ayFrom;
    this.xTo = axTo;
    this.yTo = ayTo;
    this.index = aIndex;
    if (aWaggons != null) {
      this.waggons = aWaggons;
    } else {
      this.waggons = [];
    }
    this.lenght = aLenght;
    if (this.waggons != null) {
      for (const waggon of this.waggons) {
        waggon.track = this;
      }
    }
  }

  removeWaggon(waggonToRemove: Waggon) {
    const index = waggonToRemove.track.waggons.indexOf(waggonToRemove);
    waggonToRemove.track.waggons.splice(index, 1);
  }
}
