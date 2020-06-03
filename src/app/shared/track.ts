import {Waggon} from './waggon';

export class Track {

  trackNumber: string;

  xFrom: number;

  yFrom: number;

  xTo: number;

  yTo: number;

  index: number;

  constructor(aTrackNumber: string, axFrom: number, ayFrom: number, axTo: number, ayTo: number, aIndex: number) {
    this.trackNumber = aTrackNumber;
    this.xFrom = axFrom;
    this.yFrom = ayFrom;
    this.xTo = axTo;
    this.yTo = ayTo;
    this.index = aIndex;
  }
}
