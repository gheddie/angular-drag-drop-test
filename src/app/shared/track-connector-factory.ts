import {Point} from './point';
import {TrackHeading} from './track-heading.enum';
import {TrackViewTrack} from './track-view-track';

export class TrackConnectorFactory {

  public static TRACK_HEIGHT: number = 28;

  public static ENDPOINT_DIMENSION: number = 13;

  // public static OFFSET: number = Math.sqrt(Math.pow(TrackConnectorFactory.TRACK_HEIGHT / 2, 2)  / 2);

  static calculateAnchorPoint(parentTrack: TrackViewTrack, childTrack: TrackViewTrack, aScrolledLeft: number, aScrolledTop: number): Point {

    const parentEndPoint = this.calculateEndPoint(parentTrack, aScrolledLeft, aScrolledTop);
    // console.log('calculating end point for parent track [' + parentTrack.trackNumber + ']: [x:' + parentEndPoint.x + '|y:' + parentEndPoint.y + ']');

    const x = parentEndPoint.x;
    const y = parentEndPoint.y;

    return new Point(x, y - this.TRACK_HEIGHT / 2);
  }

  static calculateEndPoint(parentTrack: TrackViewTrack, aScrolledLeft: number, aScrolledTop: number): Point {

    // console.log('calculateEndPoint [aScrolledLeft:' + aScrolledLeft + '|aScrolledTop:' + aScrolledTop + ']');

    const parentRectangle: DOMRect = document.getElementById(parentTrack.generateTagId()).getBoundingClientRect();

    let resultX: number;
    let resultY: number;

    switch (parentTrack.heading) {

      case TrackHeading.NORTH:
        resultX = parentRectangle.right - (TrackConnectorFactory.TRACK_HEIGHT / 2);
        resultY = parentRectangle.top;
        break;
      case TrackHeading.EAST:
        resultX = parentRectangle.right;
        resultY = parentRectangle.top + (TrackConnectorFactory.TRACK_HEIGHT / 2);
        break;
      case TrackHeading.SOUTH:
        resultX = parentRectangle.right - (TrackConnectorFactory.TRACK_HEIGHT / 2);
        resultY = parentRectangle.bottom;
        break;
      case TrackHeading.WEST:
        resultX = parentRectangle.left;
        resultY = parentRectangle.top + (TrackConnectorFactory.TRACK_HEIGHT / 2);
        break;
      case TrackHeading.NORTH_EAST:
        resultX = parentRectangle.right - this.triangleCatheteLenght() / 2;
        resultY = parentRectangle.top + this.triangleCatheteLenght() / 2;
        break;
      case TrackHeading.NORTH_WEST:
        resultX = parentRectangle.left + this.triangleCatheteLenght() / 2;
        resultY = parentRectangle.top + this.triangleCatheteLenght() / 2;
        break;
      case TrackHeading.SOUTH_EAST:
        resultX = parentRectangle.right - this.triangleCatheteLenght() / 2;
        resultY = parentRectangle.bottom - this.triangleCatheteLenght() / 2;
        break;
      case TrackHeading.SOUTH_WEST:
        resultX = parentRectangle.left + this.triangleCatheteLenght() / 2;
        resultY = parentRectangle.bottom - this.triangleCatheteLenght() / 2;
        break;
    }

    return new Point(resultX + aScrolledLeft, resultY + aScrolledTop);
  }

  static rotateHeading(heading: TrackHeading): TrackHeading {

    switch (heading) {

      case TrackHeading.NORTH:
        return TrackHeading.NORTH_WEST;
        break;
      case TrackHeading.EAST:
        return TrackHeading.NORTH_EAST;
        break;
      case TrackHeading.SOUTH:
        return TrackHeading.SOUTH_EAST;
        break;
      case TrackHeading.WEST:
        return TrackHeading.SOUTH_WEST;
        break;
      case TrackHeading.NORTH_EAST:
        return TrackHeading.NORTH;
        break;
      case TrackHeading.NORTH_WEST:
        return TrackHeading.WEST;
        break;
      case TrackHeading.SOUTH_EAST:
        return TrackHeading.EAST;
        break;
      case TrackHeading.SOUTH_WEST:
        return TrackHeading.SOUTH;
        break;
    }
  }

  /**
   * Die Kathete eines rechtwinkligen Dreiecks mit gleichen Katheten, wobei
   * die Hypothenuse die Länge der Gleishöhe ist.
   */
  static triangleCatheteLenght(): number {
    return Math.sqrt(Math.pow(TrackConnectorFactory.TRACK_HEIGHT, 2)  / 2);
  }
}
