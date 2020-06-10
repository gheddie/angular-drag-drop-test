import {Component, OnInit} from '@angular/core';
import {TrackViewTrack} from '../shared/track-view-track';
import {TrackHeading} from '../shared/track-heading.enum';
import {TrackViewWaggon} from '../shared/track-view-waggon';
import {Point} from '../shared/point';

@Component({
  selector: 'app-track-view',
  templateUrl: './track-view.component.html',
  styleUrls: ['./track-view.component.css']
})
export class TrackViewComponent implements OnInit {

  public static TRACK_HEIGHT: number = 28;

  public static ENDPOINT_DIMENSION: number = 13;

  tracks: TrackViewTrack[] = [];

  private selectedTrack: TrackViewTrack;

  public actuallyDragged: TrackViewWaggon;

  public selectedWaggons: TrackViewWaggon[] = [];

  private scrollLeft: number = 0;

  private scrollTop: number = 0;

  private blockWaggonEvent: boolean = false;

  constructor() {}

  ngOnInit(): void {

    const waggonsT1 = [
      new TrackViewWaggon('T1_1', 50),
      new TrackViewWaggon('T1_2', 25),
      new TrackViewWaggon('T1_3', 25)
    ];

    const waggonsT2 = [
      new TrackViewWaggon('T2_1', 50),
      new TrackViewWaggon('T2_2', 25)
    ];

    const waggonsT3 = [
      new TrackViewWaggon('T3_1', 50),
      new TrackViewWaggon('T3_2', 25),
      new TrackViewWaggon('T3_3', 50),
      new TrackViewWaggon('T3_4', 25),
      new TrackViewWaggon('T3_5', 50),
      new TrackViewWaggon('T3_6', 25),
      new TrackViewWaggon('T3_7', 50),
      new TrackViewWaggon('T3_8', 25),
    ];

    const waggonsT6 = [
      new TrackViewWaggon('T6_1', 50),
      new TrackViewWaggon('T6_2', 25)
    ];

    const waggonsT7 = [
      new TrackViewWaggon('T7_1', 50),
      new TrackViewWaggon('T7_2', 25),
      new TrackViewWaggon('T7_3', 50),
      new TrackViewWaggon('T7_4', 25)
    ];

    const waggonsT9 = [
      new TrackViewWaggon('T9_1', 50),
      new TrackViewWaggon('T9_2', 25)
    ];

    const waggonsT10 = [
      new TrackViewWaggon('T10_1', 50),
      new TrackViewWaggon('T10_2', 25),
      new TrackViewWaggon('T10_3', 25)
    ];

    // ---------------------------------------------------------------------------------------------

    const t1 = new TrackViewTrack(400, 150, 'T1',
      350, null, TrackHeading.EAST, waggonsT1);

    const t2 = new TrackViewTrack(null, null, 'T2',
      180, t1, TrackHeading.NORTH_EAST, waggonsT2);

    const t3 = new TrackViewTrack(null, null, 'T3',
      580, t1, TrackHeading.EAST, waggonsT3);

    const t4 = new TrackViewTrack(null, null, 'T4',
      300, t1, TrackHeading.SOUTH_EAST, null);

    const t5 = new TrackViewTrack(null, null, 'T5',
      300, t4, TrackHeading.NORTH_EAST, null);

    const t6 = new TrackViewTrack(null, null, 'T6',
      2400, t4, TrackHeading.EAST, waggonsT6);

    const t7 = new TrackViewTrack(null, null, 'T7',
      500, t4, TrackHeading.WEST, waggonsT7);

    const t8 = new TrackViewTrack(null, null, 'T8',
      580, t7, TrackHeading.SOUTH_EAST, null);

    const t9 = new TrackViewTrack(null, null, 'T9',
      200, t8, TrackHeading.NORTH_EAST, waggonsT9);

    const t10 = new TrackViewTrack(null, null, 'T10',
      200, t8, TrackHeading.SOUTH_EAST, waggonsT10);

    const t11 = new TrackViewTrack(null, null, 'T11',
      200, t8, TrackHeading.EAST, null);

    // ---------------------------------------------------------------------------------------------

    /*
    const t1 = new TrackViewTrack(100, 100, 'T1',
      150, null, TrackHeading.EAST, waggonsT1);

    const t2 = new TrackViewTrack(null, null, 'T2',
      180, t1, TrackHeading.SOUTH_EAST, waggonsT2);

    const t3 = new TrackViewTrack(null, null, 'T3',
      580, t2, TrackHeading.EAST, waggonsT3);

    const t4 = new TrackViewTrack(null, null, 'T4',
      180, t2, TrackHeading.SOUTH_EAST, null);

    const t5 = new TrackViewTrack(null, null, 'T5',
      180, t4, TrackHeading.EAST, null);

    const t6 = new TrackViewTrack(null, null, 'T6',
      1500, t1, TrackHeading.EAST, null);

    const t7 = new TrackViewTrack(null, null, 'T7',
      180, t3, TrackHeading.NORTH_EAST, waggonsT7);

    const t8 = new TrackViewTrack(null, null, 'T8',
      180, t5, TrackHeading.NORTH_EAST, null);

    const t9 = new TrackViewTrack(null, null, 'T9',
      880, t4, TrackHeading.SOUTH_EAST, waggonsT9);

    const t10 = new TrackViewTrack(null, null, 'T10',
      3000, t9, TrackHeading.EAST, null);

    const t11 = new TrackViewTrack(null, null, 'T11',
      500, t9, TrackHeading.NORTH_WEST, null);
      */

    // ---------------------------------------------------------------------------------------------

    this.tracks = [
      t1, t2, t3, t4, t5, t6, t7, t8, t9, t10, t11
    ];

    /*
    this.tracks = [
      t1, t2, t3, t4, t5, t6, t7, t8, t9, t10, t11
    ];
    */
  }

  calculateTrackLeft(track: TrackViewTrack) {
    if (track.parentTrack != null) {
      return this.calculateAnchorPoint(track, this.scrollLeft, this.scrollTop).x;
    }
    return track.x;
  }

  calculateTrackTop(track: TrackViewTrack) {
    if (track.parentTrack != null) {
      return this.calculateAnchorPoint(track, this.scrollLeft, this.scrollTop).y;
    }
    return track.y;
  }

  calculateAnchorPoint(aTrack: TrackViewTrack, aScrolledLeft: number, aScrolledTop: number): Point {

    const parentEndPoint = this.calculateEndPoint(aTrack.parentTrack, aScrolledLeft, aScrolledTop);

    const x = parentEndPoint.x;
    const y = parentEndPoint.y;

    return new Point(x, y - TrackViewComponent.TRACK_HEIGHT / 2);
  }

  waggonClicked(aWaggon: TrackViewWaggon) {

    aWaggon.selected = !aWaggon.selected;

    console.log('waggon clicked: ' + aWaggon.waggonNumber + ' [selected:' + aWaggon.selected + ']');
    if (aWaggon.selected) {
      this.selectedWaggons.push(aWaggon);
    } else {
      this.selectedWaggons.splice(this.selectedWaggons.indexOf(aWaggon), 1);
    }
    console.log('------------ SELECTION:');
    for (const w of this.selectedWaggons) {
      console.log(w.waggonNumber);
    }
  }

  trackClicked(track: TrackViewTrack) {

    console.log('trackClicked');
    if (track.selected) {
      track.selected = false;
      this.selectedTrack = null;
    } else {
      for (const aTrack of this.tracks) {
        aTrack.selected = false;
      }
      track.selected = true;
      this.selectedTrack = track;
    }
  }

  calcaluateRotation(track: TrackViewTrack) {

    let heading = null;

    switch (track.heading) {

      case TrackHeading.NORTH:
        heading = 270;
        break;
      case TrackHeading.EAST:
        heading = 0;
        break;
      case TrackHeading.SOUTH:
        heading = 90;
        break;
      case TrackHeading.WEST:
        heading = 180;
        break;
      case TrackHeading.NORTH_EAST:
        heading = 315;
        break;
      case TrackHeading.NORTH_WEST:
        heading = 225;
        break;
      case TrackHeading.SOUTH_EAST:
        heading = 45;
        break;
      case TrackHeading.SOUTH_WEST:
        heading = 135;
        break;
      default:
        heading = 0;
        break;
    }

    return heading;
  }

  generateWaggonToolTip(waggon: TrackViewWaggon) {

    let toolTip = '';
    toolTip += 'Waggon-Nr.: ' + waggon.waggonNumber;
    toolTip += '\n';
    toolTip += 'Länge: ' + waggon.length;
    return toolTip;
  }

  generateTrackToolTip(track: TrackViewTrack) {

    let toolTip = '';
    toolTip += 'Gleis-Nr.: ' + track.trackNumber;
    toolTip += '\n';
    toolTip += 'Länge (gesamt): ' + track.length;
    toolTip += '\n';
    toolTip += 'Ausrichtung: ' + track.heading;
    if (track.parentTrack != null) {
      toolTip += '\n';
      toolTip += 'Root: ' + track.parentTrack.trackNumber;
      toolTip += '\n';
      toolTip += 'Ausrichtung (Root): ' + track.parentTrack.heading;
    }
    return toolTip;
  }

  calculateWaggonOffsetOnTrack(waggon: TrackViewWaggon) {

    let result = 30;
    // console.log('calculate waggon offset for waggon ' + waggon.waggonNumber + ' on track: ' + waggon.track.trackNumber);
    const index = waggon.track.waggons.indexOf(waggon);
    for (let i = 0; i < index; i++) {
      // console.log('regarding previous waggon: ' + waggon.track.waggons[i].waggonNumber);
      result += waggon.track.waggons[i].length + 5;
    }
    return result;
  }

  getTrackHeight(track: TrackViewTrack) {
    if (track.selected) {
      // for border
      return TrackViewComponent.TRACK_HEIGHT - 2;
    }
    return TrackViewComponent.TRACK_HEIGHT;
  }

  calculateTrackEndpointX(track: TrackViewTrack): number {
    const topLeftEndpoint: Point = this.calculateEndPoint(track, this.scrollLeft, this.scrollTop);
    return topLeftEndpoint.x - (TrackViewComponent.ENDPOINT_DIMENSION / 2);
  }

  calculateTrackEndpointY(track: TrackViewTrack): number {
    const topLeftEndpoint: Point = this.calculateEndPoint(track, this.scrollLeft, this.scrollTop);
    return topLeftEndpoint.y - (TrackViewComponent.ENDPOINT_DIMENSION / 2);
  }

  calculateEndPoint(track: TrackViewTrack, aScrolledLeft: number, aScrolledTop: number): Point {

    // console.log('calculateEndPoint [aScrolledLeft:' + aScrolledLeft + '|aScrolledTop:' + aScrolledTop + ']');

    const parentRectangle: DOMRect = document.getElementById(track.generateTagId()).getBoundingClientRect();

    let resultX: number;
    let resultY: number;

    switch (track.heading) {

      case TrackHeading.NORTH:
        resultX = parentRectangle.right - (TrackViewComponent.TRACK_HEIGHT / 2);
        resultY = parentRectangle.top;
        break;
      case TrackHeading.EAST:
        resultX = parentRectangle.right;
        resultY = parentRectangle.top + (TrackViewComponent.TRACK_HEIGHT / 2);
        break;
      case TrackHeading.SOUTH:
        resultX = parentRectangle.right - (TrackViewComponent.TRACK_HEIGHT / 2);
        resultY = parentRectangle.bottom;
        break;
      case TrackHeading.WEST:
        resultX = parentRectangle.left;
        resultY = parentRectangle.top + (TrackViewComponent.TRACK_HEIGHT / 2);
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

  /**
   * Die Kathete eines rechtwinkligen Dreiecks mit gleichen Katheten, wobei
   * die Hypothenuse die Länge der Gleishöhe ist.
   */
  triangleCatheteLenght(): number {
    return Math.sqrt(Math.pow(TrackViewComponent.TRACK_HEIGHT, 2)  / 2);
  }

  getEndpointHeight() {
    return TrackViewComponent.ENDPOINT_DIMENSION;
  }

  keyPressed($event: KeyboardEvent) {
    console.log('key pressed: ');
  }

  getTrackBorder(track: TrackViewTrack): string {
    if (track.selected) {
      return '1px solid black';
    } else {
      return '0px solid black';
    }
  }

  appendTrack() {

    console.log('appendTrack');

    if (this.selectedTrack != null) {
      const newTrack = new TrackViewTrack(null,  null, 'NEW_TRACK', 100, this.selectedTrack, TrackHeading.EAST, null);
      this.tracks.push(newTrack);
    }
  }

  rotateSelectedTrack() {

    if (this.selectedTrack != null) {
      this.selectedTrack.heading = this.rotateHeading(this.selectedTrack.heading);
    }
  }

  // --- drag + drop

  public dragStart(event: DragEvent, waggon: TrackViewWaggon){
    console.log('start dragging waggon: ' + waggon.waggonNumber);
    this.actuallyDragged = waggon;
  }

  public dragEnd(event: DragEvent, waggon: TrackViewWaggon){
    this.actuallyDragged = undefined;
  }

  public dragOver(event: DragEvent){
    // console.log('drag over...');
    if (this.actuallyDragged){
      event.preventDefault();
    }
  }

  dropWaggonToTrack($event: DragEvent, targetTrack: TrackViewTrack) {

    if (this.blockWaggonEvent) {
      this.blockWaggonEvent = false;
      console.log('this.blockWaggonEvent = false;');
      console.log('dropWaggonToTrack false --> returning');
      return;
    }

    console.log('dropped waggon ' + this.actuallyDragged.waggonNumber + ' to track ' + targetTrack.trackNumber + '.');
    const waggonSelection = this.selectedWaggons;

    for (const w of this.selectedWaggons) {
      this.moveWaggonToTrack(w, targetTrack);
    }

    this.actuallyDragged = undefined;
  }

  public dropWaggonToWaggon(event: DragEvent, targetWaggon: TrackViewWaggon) {

    /**
     * until we know to consume the event, so dropping
     * a waggon does not also trigger dropping to track...
     */
    this.blockWaggonEvent = true;
    console.log('this.blockWaggonEvent = true;');

    console.log('dropped waggon ' + this.actuallyDragged.waggonNumber + ' to waggon '
      + targetWaggon.waggonNumber + ' [target track=' + targetWaggon.track.trackNumber + '].');

    for (const w of this.selectedWaggons) {
      this.moveWaggonToWaggon(w, targetWaggon);
    }
    this.actuallyDragged = undefined;

    /*
    this.blockWaggonEvent = false;
    console.log('this.blockWaggonEvent = false;');
    */
  }

  getWaggonColor(waggon: TrackViewWaggon) {
    if (waggon.selected) {
      return 'red';
    }
    return 'white';
  }

  moveWaggonToTrack(sourceWaggon: TrackViewWaggon, targetTrack: TrackViewTrack) {

    const droppedWaggon = sourceWaggon;
    // remove waggon from source track...
    droppedWaggon.track.removeWaggon(droppedWaggon);
    // add waggon to target track...
    if (targetTrack.waggons == null) {
      targetTrack.waggons = [];
    }
    targetTrack.waggons.push(droppedWaggon);
    droppedWaggon.track = targetTrack;

    this.selectedWaggons = [];
    this.deselectWaggons();
  }

  moveWaggonToWaggon(sourceWaggon: TrackViewWaggon, targetWaggon: TrackViewWaggon) {

    const droppedWaggon = sourceWaggon;
    // remove waggon from source track...
    targetWaggon.track.removeWaggon(droppedWaggon);
    // add waggon to target track...
    targetWaggon.track.waggons.splice((targetWaggon.track.waggons.indexOf(targetWaggon) + 1), 0, droppedWaggon);
    droppedWaggon.track = targetWaggon.track;

    this.selectedWaggons = [];
    this.deselectWaggons();
  }

  private deselectWaggons() {

    for (const track of this.tracks) {
      if (track.waggons != null) {
        for (const waggon of track.waggons) {
          waggon.selected = false;
        }
      }
    }
  }

  scrolled($event: Event) {
    const trackView: HTMLDivElement = (event.srcElement as HTMLDivElement);
    this.scrollTop = trackView.scrollTop;
    this.scrollLeft = trackView.scrollLeft;
    console.log('scrolled to [top:' + this.scrollTop + '|left:' + this.scrollLeft + ']');
  }

  waggonDraggable(waggon: TrackViewWaggon) {
    // console.log('checking waggon draggable: ' + waggon.waggonNumber);
    return (waggon.selected);
  }

  rotateHeading(heading: TrackHeading): TrackHeading {

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
}
