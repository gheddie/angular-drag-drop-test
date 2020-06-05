import {Waggon} from './waggon';

export class Track {

  trackNumber: string;

  xFrom: number;

  yFrom: number;

  rotation: number;

  waggons: Waggon[];

  lenght: number;

  parent: Track;

  index: number;

  constructor(aTrackNumber: string, axFrom: number, ayFrom: number, aRotation: number, aWaggons: Waggon[], aLenght: number, aParent: Track, aIndex: number) {
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
    this.index = aIndex;
  }

  removeWaggon(waggonToRemove: Waggon) {
    const index = waggonToRemove.track.waggons.indexOf(waggonToRemove);
    waggonToRemove.track.waggons.splice(index, 1);
  }

  calculateUsableLenght() {
    return 357;
  }
}
