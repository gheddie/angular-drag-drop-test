import {Waggon} from './waggon';

export class Track {

  trackNumber: string;

  xFrom: number;

  yFrom: number;

  rotation: number;

  waggons: Waggon[];

  lenght: number;

  parent: Track;

  constructor(aTrackNumber: string, axFrom: number, ayFrom: number, aRotation: number, aWaggons: Waggon[], aLenght: number, aParent: Track) {
    this.trackNumber = aTrackNumber;
    this.xFrom = axFrom;
    this.yFrom = ayFrom;
    this.rotation = aRotation;
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
    this.parent = aParent;
  }

  removeWaggon(waggonToRemove: Waggon) {
    const index = waggonToRemove.track.waggons.indexOf(waggonToRemove);
    waggonToRemove.track.waggons.splice(index, 1);
  }
}
