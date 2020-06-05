import {Track} from './track';

export class TrackPositioner {

  private actualY: number = 10;

  calculateX(aTrack: Track) {
   return 10;
  }

  calculateY(aTrack: Track) {
    const result = this.actualY;
    this.actualY += 20;
    return result;
  }
}
