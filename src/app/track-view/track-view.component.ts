import {Component, OnInit} from '@angular/core';
import {TrackViewTrack} from '../shared/track-view-track';
import {TrackHeading} from '../shared/track-heading.enum';
import {TrackViewWaggon} from '../shared/track-view-waggon';
import {Waggon} from '../shared/waggon';

@Component({
  selector: 'app-track-view',
  templateUrl: './track-view.component.html',
  styleUrls: ['./track-view.component.css']
})
export class TrackViewComponent implements OnInit {

  tracks: TrackViewTrack[] = [];

  constructor() { }

  ngOnInit(): void {

    const waggonsA = [
      new TrackViewWaggon('A_1', 100),
      new TrackViewWaggon('A_2', 75),
      new TrackViewWaggon('A_3', 50)
    ];

    const waggonsB = [
      new TrackViewWaggon('B_1', 100),
      new TrackViewWaggon('B_2', 75)
    ];

    const trackA = new TrackViewTrack(300, 300, 'Track_A',
      300, null, TrackHeading.EAST, waggonsA);

    const trackB = new TrackViewTrack(300, 300, 'Track_B',
      200, trackA, TrackHeading.EAST, waggonsB);

    this.tracks = [
      trackA, trackB
    ];

    /*
    const tNorth = new TrackViewTrack(100, 100, 'tNorth', 100, null, TrackHeading.EAST);
    const tEast = new TrackViewTrack(200, 200, 'tEast', 200, null, TrackHeading.EAST);
    const tSouth = new TrackViewTrack(300, 300, 'tSouth', 300, null, TrackHeading.EAST);
    const tWest = new TrackViewTrack(400, 600, 'tWest', 400, null, TrackHeading.EAST);
    const tNorthEast = new TrackViewTrack(100, 100, 'tNorthEast', 100, null, TrackHeading.EAST);
    const tNorthWest = new TrackViewTrack(200, 200, 'tNorthWest', 200, null, TrackHeading.EAST);
    const tSouthEast = new TrackViewTrack(300, 300, 'tSouthEast', 300, null, TrackHeading.EAST);
    const tSouthWest = new TrackViewTrack(400, 600, 'tSouthWest', 400, null, TrackHeading.EAST);

    this.tracks = [
      tNorth,
      tEast,
      tSouth,
      tWest,
      tNorthEast,
      tNorthWest,
      tSouthEast,
      tSouthWest
    ];
    */
  }

  calculateTrackLeft(waggon: TrackViewTrack) {
    return waggon.x;
  }

  calculateTrackTop(waggon: TrackViewTrack) {
    return waggon.y;
  }

  valueClicked(value: TrackViewTrack) {

    console.log('value clicked: ' + value);
    const element = document.getElementById(this.generateTagId(value));

    console.log('found element: ' + element);

    // values
    console.log('height: ' + (element as HTMLDivElement).offsetHeight);
    console.log('width: ' + (element as HTMLDivElement).offsetWidth);
    console.log('top: ' + (element as HTMLDivElement).offsetTop);
    console.log('left: ' + (element as HTMLDivElement).offsetLeft);

    const bounds: DOMRect = (element as HTMLDivElement).getBoundingClientRect();

    console.log('top: ' + bounds.top);
    console.log('left: ' + bounds.left);
    console.log('bottom: ' + bounds.bottom);
    console.log('right: ' + bounds.right);
  }

  generateTagId(track: TrackViewTrack) {
    return 'TR_' + track.trackNumber;
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
    return toolTip;
  }

  calculateWaggonOffsetOnTrack(waggon: TrackViewWaggon) {

    let result = 5;
    // console.log('calculate waggon offset for waggon ' + waggon.waggonNumber + ' on track: ' + waggon.track.trackNumber);
    const index = waggon.track.waggons.indexOf(waggon);
    for (let i = 0; i < index; i++) {
      // console.log('regarding previous waggon: ' + waggon.track.waggons[i].waggonNumber);
      result += waggon.track.waggons[i].length + 5;
    }
    return result;
  }
}
