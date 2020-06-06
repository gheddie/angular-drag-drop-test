import {Waggon} from './waggon';
import {Track} from './track';

export class ShuntingOrder {

  waggons: Waggon[];

  targetWaggon: Waggon;

  targetTrack: Track;

  constructor(aWaggons: Waggon[], aTargetWaggon: Waggon, aTargetTrack: Track) {

    this.waggons = aWaggons;
    this.targetTrack = aTargetTrack;
    this.targetWaggon = aTargetWaggon;
  }

  generateInfo() {

    let waggonList = '';
    for (const w of this.waggons) {
      waggonList += w.waggonNumber + ', ';
    }
    let result = waggonList + ' ';
    if (this.targetWaggon != null) {
      result += 'to waggon ' + this.targetWaggon.waggonNumber;
    } else {
      result += 'to track ' + this.targetTrack.trackNumber;
    }
    return result;
  }
}
