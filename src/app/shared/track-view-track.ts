import {TrackHeading} from './track-heading.enum';
import {TrackViewWaggon} from './track-view-waggon';
import {Point} from './point';

export class TrackViewTrack {

  public x: number;

  public y: number;

  public trackNumber: string;

  public length: number;

  public parentTrack: TrackViewTrack;

  public heading: TrackHeading;

  public waggons: TrackViewWaggon[];

  selected: boolean = false;

  constructor(aX: number, aY: number, aTrackNumber: string, aLength: number, aParentTrack: TrackViewTrack, aHeading: TrackHeading, aWaggons: TrackViewWaggon[]) {

    this.x = aX;
    this.y = aY;
    this.trackNumber = aTrackNumber;
    this.length = aLength;
    this.parentTrack = aParentTrack;
    this.heading = aHeading;
    this.waggons = aWaggons;
    if (this.waggons != null) {
      for (const waggon of this.waggons) {
        waggon.track = this;
      }
    }
  }

  generateTagId(): string {
    return 'TR_' + this.trackNumber;
  }

  removeWaggon(waggonToRemove: TrackViewWaggon) {
    const index = waggonToRemove.track.waggons.indexOf(waggonToRemove);
    waggonToRemove.track.waggons.splice(index, 1);
  }
}
