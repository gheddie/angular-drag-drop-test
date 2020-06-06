import {TrackHeading} from './track-heading.enum';
import {Waggon} from './waggon';
import {TrackViewWaggon} from './track-view-waggon';

export class TrackViewTrack {

  public x: number;

  public y: number;

  public trackNumber: string;

  public length: number;

  public parentTrack: TrackViewTrack;

  public heading: TrackHeading;

  public waggons: TrackViewWaggon[];

  constructor(aX: number, aY: number, aTrackNumber: string, aLength: number, aParentTrack: TrackViewTrack, aHeading: TrackHeading, aWaggons: TrackViewWaggon[]) {

    this.x = aX;
    this.y = aY;
    this.trackNumber = aTrackNumber;
    this.length = aLength;
    this.parentTrack = aParentTrack;
    this.heading = aHeading;
    this.waggons = aWaggons;
    for (const waggon of this.waggons) {
      waggon.track = this;
    }
  }
}
