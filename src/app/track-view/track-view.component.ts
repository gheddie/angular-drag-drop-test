import {Component, OnInit} from '@angular/core';
import {TrackViewTrack} from '../shared/track-view-track';
import {TrackHeading} from '../shared/track-heading.enum';
import {TrackViewWaggon} from '../shared/track-view-waggon';
import {TrackConnectorFactory} from '../shared/track-connector-factory';
import {Point} from '../shared/point';

@Component({
  selector: 'app-track-view',
  templateUrl: './track-view.component.html',
  styleUrls: ['./track-view.component.css']
})
export class TrackViewComponent implements OnInit {

  tracks: TrackViewTrack[] = [];

  constructor() { }

  ngOnInit(): void {

    const waggons = [
      new TrackViewWaggon('W_1', 50),
      new TrackViewWaggon('W_2', 25),
      new TrackViewWaggon('W_3', 25)
    ];

    const trackRoot = new TrackViewTrack(400, 300, 'trackRoot',
      150, null, TrackHeading.EAST, waggons);

    const trackChild = new TrackViewTrack(null, null, 'trackChild',
      380, trackRoot, TrackHeading.EAST, waggons);

    this.tracks = [
      trackRoot, trackChild
    ];
  }

  calculateTrackLeft(track: TrackViewTrack) {
    if (track.parentTrack != null) {
      return track.calculateAnchorPoint(track.parentTrack).x;
    }
    return track.x;
  }

  calculateTrackTop(track: TrackViewTrack) {
    if (track.parentTrack != null) {
      return track.calculateAnchorPoint(track.parentTrack).y;
    }
    return track.y;
  }

  valueClicked(track: TrackViewTrack) {

    console.log('value clicked: ' + track);
    const element = document.getElementById(track.generateTagId());

    track.heading = TrackConnectorFactory.rotateHeading(track.heading);

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
      toolTip += 'Ausrichtung (Root): ' + track.parentTrack.heading;
    }
    return toolTip;
  }

  calculateWaggonOffsetOnTrack(waggon: TrackViewWaggon) {

    let result = 15;
    // console.log('calculate waggon offset for waggon ' + waggon.waggonNumber + ' on track: ' + waggon.track.trackNumber);
    const index = waggon.track.waggons.indexOf(waggon);
    for (let i = 0; i < index; i++) {
      // console.log('regarding previous waggon: ' + waggon.track.waggons[i].waggonNumber);
      result += waggon.track.waggons[i].length + 5;
    }
    return result;
  }

  getTrackHeight() {
    return TrackConnectorFactory.TRACK_HEIGHT;
  }

  calculateTrackEndpointX(track: TrackViewTrack): number {
    const topLeftEndpoint: Point = TrackConnectorFactory.calculateEndPoint(track);
    return  topLeftEndpoint.x - (TrackConnectorFactory.ENDPOINT_DIMENSION / 2);
  }

  calculateTrackEndpointY(track: TrackViewTrack): number {
    const topLeftEndpoint: Point = TrackConnectorFactory.calculateEndPoint(track);
    return  topLeftEndpoint.y - (TrackConnectorFactory.ENDPOINT_DIMENSION / 2);
  }

  getEndpointHeight() {
    return TrackConnectorFactory.ENDPOINT_DIMENSION;
  }
}
