import {TrackViewTrack} from './track-view-track';

export class TrackViewWaggon {

  public waggonNumber: string;

  public track: TrackViewTrack;

  length: number;

  constructor(aWaggonNumber: string, aLength: number) {
    this.waggonNumber = aWaggonNumber;
    this.length = aLength;
  }
}
