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

  public static TRACK_HEIGHT = 28;

  public static ENDPOINT_DIMENSION = 13;

  tracks: TrackViewTrack[] = [];

  private selectedTrack: TrackViewTrack;

  public actuallyDragged: TrackViewWaggon;

  public selectedWaggons: TrackViewWaggon[] = [];

  private scrollLeft = 0;

  private scrollTop = 0;

  private blockWaggonEvent = false;

  private zoomFactor: number = 1;

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

    this.tracks = [
      t1, t2, t3, t4, t5, t6, t7, t8, t9, t10, t11
    ];
  }

  calculateTrackLeft(track: TrackViewTrack): number {
    if (track.parentTrack != null) {
      return this.calculateEndPoint(track.parentTrack, this.scrollLeft, this.scrollTop).x;
    }
    return track.x;
  }

  calculateTrackTop(track: TrackViewTrack): number {
    if (track.parentTrack != null) {
      return this.calculateEndPoint(track.parentTrack, this.scrollLeft, this.scrollTop).y - TrackViewComponent.TRACK_HEIGHT / 2;
    }
    return track.y;
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

  calcaluateRotation(track: TrackViewTrack): TrackHeading {

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

  generateWaggonToolTip(waggon: TrackViewWaggon): string {

    let toolTip = '';
    toolTip += 'Waggon-Nr.: ' + waggon.waggonNumber;
    toolTip += '\n';
    toolTip += 'Länge: ' + waggon.length;
    return toolTip;
  }

  generateTrackToolTip(track: TrackViewTrack): string {

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

  calculateWaggonOffsetOnTrack(waggon: TrackViewWaggon): number {

    let result = 30;
    const index = waggon.track.waggons.indexOf(waggon);
    for (let i = 0; i < index; i++) {
      result += waggon.track.waggons[i].length * this.zoomFactor + 5 * this.zoomFactor;
    }
    return result;
  }

  calculateTrackHeight(track: TrackViewTrack): number {
    if (track.selected) {
      // for border
      return (TrackViewComponent.TRACK_HEIGHT - 2) * this.zoomFactor;
    }
    return TrackViewComponent.TRACK_HEIGHT * this.zoomFactor;
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

    const parentRectangle: DOMRect = document.getElementById(track.generateTagId()).getBoundingClientRect();

    let resultX: number;
    let resultY: number;

    switch (track.heading) {

      case TrackHeading.NORTH:
        resultX = parentRectangle.right - (TrackViewComponent.TRACK_HEIGHT * this.zoomFactor / 2);
        resultY = parentRectangle.top;
        break;
      case TrackHeading.EAST:
        resultX = parentRectangle.right;
        resultY = parentRectangle.top + (TrackViewComponent.TRACK_HEIGHT * this.zoomFactor / 2);
        break;
      case TrackHeading.SOUTH:
        resultX = parentRectangle.right - (TrackViewComponent.TRACK_HEIGHT * this.zoomFactor / 2);
        resultY = parentRectangle.bottom;
        break;
      case TrackHeading.WEST:
        resultX = parentRectangle.left;
        resultY = parentRectangle.top + (TrackViewComponent.TRACK_HEIGHT * this.zoomFactor / 2);
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
    return Math.sqrt(Math.pow(TrackViewComponent.TRACK_HEIGHT * this.zoomFactor, 2)  / 2);
  }

  getEndpointHeight(): number {
    return TrackViewComponent.ENDPOINT_DIMENSION * this.zoomFactor;
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

    if (this.actuallyDragged.selected) {

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
    }

    this.actuallyDragged = undefined;

    this.selectedWaggons = [];
    this.deselectWaggons();
  }

  public dropWaggonToWaggon(event: DragEvent, targetWaggon: TrackViewWaggon) {

    /**
     * until we know to consume the event, so dropping
     * a waggon does not also trigger dropping to track...
     */

    if (this.actuallyDragged.selected) {

      this.blockWaggonEvent = true;
      console.log('this.blockWaggonEvent = true;');

      console.log('dropped waggon ' + this.actuallyDragged.waggonNumber + ' to waggon '
        + targetWaggon.waggonNumber + ' [target track=' + targetWaggon.track.trackNumber + '].');

      for (const w of this.selectedWaggons) {
        this.moveWaggonToWaggon(w, targetWaggon);
      }
    }

    this.actuallyDragged = undefined;

    this.selectedWaggons = [];
    this.deselectWaggons();
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
  }

  moveWaggonToWaggon(sourceWaggon: TrackViewWaggon, targetWaggon: TrackViewWaggon) {

    const droppedWaggon = sourceWaggon;
    // remove waggon from source track...
    targetWaggon.track.removeWaggon(droppedWaggon);
    // add waggon to target track...
    targetWaggon.track.waggons.splice((targetWaggon.track.waggons.indexOf(targetWaggon) + 1), 0, droppedWaggon);
    droppedWaggon.track = targetWaggon.track;
  }

  getWaggonColor(waggon: TrackViewWaggon): string {
    if (waggon.selected) {
      return 'red';
    }
    return 'white';
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

  trackViewScrolled($event: Event) {
    const trackView: HTMLDivElement = (event.srcElement as HTMLDivElement);
    this.scrollTop = trackView.scrollTop;
    this.scrollLeft = trackView.scrollLeft;
    console.log('scrolled to [top:' + this.scrollTop + '|left:' + this.scrollLeft + ']');
  }

  /**
   * TODO: does not work from template...
   *
   * @param waggon
   */
  waggonDraggable(waggon: TrackViewWaggon): string {
    /*
    console.log('waggonDraggable? --> ' + waggon.waggonNumber);
    if (waggon.selected) {
      return 'true';
    }
    */
    return false + '';
  }

  calculateTrackLength(track: TrackViewTrack): number {
    return track.length * this.zoomFactor;
  }

  calculateWaggonLength(waggon: TrackViewWaggon): number {
    return waggon.length * this.zoomFactor;
  }

  calculateWaggonHeight(waggon: TrackViewWaggon): number {
    return 20 * this.zoomFactor;
  }

  calculateWaggonTop(waggon: TrackViewWaggon): number {
    return 3 * this.zoomFactor;
  }

  zoomIn(): void {
    if (this.zoomFactor < 5) {
      this.zoomFactor = this.zoomFactor + 0.1;
    }
  }

  zoomOut(): void {
    if (this.zoomFactor > 0.1) {
      this.zoomFactor = this.zoomFactor - 0.1;
    }
  }
}
