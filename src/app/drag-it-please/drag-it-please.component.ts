import { Component, OnInit } from '@angular/core';
import {Item} from '../shared/item';
import {Waggon} from '../shared/waggon';
import {Track} from '../shared/track';

// https://entwickler.de/online/javascript/angular-d3-js-drag-drop-579852258.html

@Component({
  selector: 'app-drag-it-please',
  templateUrl: './drag-it-please.component.html',
  styleUrls: ['./drag-it-please.component.css']
})
export class DragItPleaseComponent implements OnInit {

  static readonly TRACK_HEIGHT = 20;

  public droppedItemsHash: Map<string, Item[]>;

  public actuallyDragged: Waggon;

  public dropZones: string[] = ['DZ1', 'DZ2'];

  public dropTargets: string[] = ['DT1', 'DT2', 'DT3', 'DT4'];

  public tracks: Track[] = [];

  constructor() {
    // ...
  }

  ngOnInit(): void {

    this.droppedItemsHash = new Map<string, Item[]>();

    const waggonsT1 = [
      new Waggon('123', 25),
      new Waggon('234', 50)
    ];

    const waggonsT2 = [
      new Waggon('345', 50)
    ];

    const waggonsT3 = [];

    const waggonsT4 = [
      new Waggon('456', 75),
      new Waggon('567', 25),
      new Waggon('678', 33),
      new Waggon('789', 47),
      new Waggon('890', 25),
    ];

    const t1 = new Track('T1', 100, 100, 0, waggonsT1, 440, null);
    const t2 = new Track('T2', 50, 200, 45, waggonsT2, 300, t1);

    this.tracks = [
      t1, t2
    ];

    /*
    const t1 = new Track('T1', 100, 100, 0, waggonsT1, 2400, null);
    const t2 = new Track('T2', 50, 200, 0, waggonsT2, 300, null);
    const t3 = new Track('T3', 25, 300, 0, waggonsT3, 200, null);
    const t4 = new Track('T4', 175, 400, 67, waggonsT4, 1550, null);

    this.tracks = [
      t1, t2, t3, t4
    ];
    */
  }

  public dragStart(event: DragEvent, waggon: Waggon){
    console.log('start dragging waggon: ' + waggon.waggonNumber);
    this.actuallyDragged = waggon;
  }

  public dragEnd(event: DragEvent, waggon: Waggon){
    this.actuallyDragged = undefined;
  }

  public dragOver(event: DragEvent){
    // console.log('drag over...');
    if(this.actuallyDragged){
      event.preventDefault();
    }
  }

  public dropWaggonToWaggon(event: DragEvent, targetWaggon : Waggon) {

    console.log('dropped waggon ' + this.actuallyDragged.waggonNumber + ' to waggon ' + targetWaggon.waggonNumber + ' [target track=' + targetWaggon.track.trackNumber + '].');

    const droppedWaggon = this.actuallyDragged;

    // remove waggon from source track...
    targetWaggon.track.removeWaggon(droppedWaggon);
    // add waggon to target track...
    targetWaggon.track.waggons.splice((targetWaggon.track.waggons.indexOf(targetWaggon) + 1), 0, droppedWaggon);

    droppedWaggon.track = targetWaggon.track;

    this.actuallyDragged = undefined;
    this.debugTrackWaggons();
  }

  public dropWaggonToTrack(event: DragEvent, targetTrack : Track) {
    console.log('dropped waggon ' + this.actuallyDragged.waggonNumber + ' to track ' + targetTrack.trackNumber + '.');

    const droppedWaggon = this.actuallyDragged;

    // remove waggon from source track...
    targetTrack.removeWaggon(this.actuallyDragged);
    // add waggon to target track...
    targetTrack.waggons.push(this.actuallyDragged);

    droppedWaggon.track = targetTrack;

    this.actuallyDragged = undefined;
    this.debugTrackWaggons();
  }

  getDroppedItems(identifier: string) {
    // console.log('get dropped items for identifier: ' + identifier);
    return this.droppedItemsHash.get(identifier);
  }

  waggonClicked(aWaggon: Waggon) {
    console.log('waggon clicked: ' + aWaggon.waggonNumber);
  }

  trackClicked(aTrack: Track) {
    console.log('track clicked: ' + aTrack.trackNumber);
  }

  calculateWaggonOffsetOnTrack(waggon: Waggon) {
    let result = 25;
    // console.log('calculate waggon offset for waggon ' + waggon.waggonNumber + ' on track: ' + waggon.track.trackNumber);
    const index = waggon.track.waggons.indexOf(waggon);
    for (let i = 0; i < index; i++) {
      // console.log('regarding previous waggon: ' + waggon.track.waggons[i].waggonNumber);
      result += waggon.track.waggons[i].renderingLength + 5;
    }
    return result;
  }

  isLastWaggonOnTrack(waggon: Waggon) {
    return (waggon.track.waggons.indexOf(waggon) === waggon.track.waggons.length - 1);
  }

  getEmptyTrackLenght(waggon: Waggon) {
    let occupiedTrackLenght = 0;
    for (const w of waggon.track.waggons) {
      occupiedTrackLenght += w.renderingLength + 50;
    }
    return (waggon.track.lenght - occupiedTrackLenght);
  }

  private isTrackEmpty(track: Track) {
    return (track.waggons == null || track.waggons.length === 0);
  }

  getOccupiedTracks() {
    const result = new Array();
    for (const t of this.tracks) {
      if (!this.isTrackEmpty(t)) {
        result.push(t);
      }
    }
    return result;
  }

  getEmptyTracks() {
    const result = new Array();
    for (const t of this.tracks) {
      if (this.isTrackEmpty(t)) {
        result.push(t);
      }
    }
    return result;
  }

  getTrackHeight() {
    return DragItPleaseComponent.TRACK_HEIGHT;
  }

  private debugTrackWaggons() {
    for (const t of this.tracks) {
      if (this.isTrackEmpty(t)) {
        console.log('--- Track [' + t.trackNumber + '] (EMPTY) ------------');
      } else {
        console.log('--- Track [' + t.trackNumber + '] (' + t.waggons.length + ' waggons) ------------');
        for (const w of t.waggons) {
          console.log('Waggon [' + w.waggonNumber + '] ------------');
        }
      }
    }
  }

  generateTrackToolTip(aTrack: Track) {
    let toolTip = '';
    toolTip += 'Gleis-Nr.:' + aTrack.trackNumber;
    return toolTip;
  }

  generateWaggonToolTip(aWaggon: Waggon) {
    let toolTip = '';
    toolTip += 'Waggen-Nr.:' + aWaggon.waggonNumber;
    toolTip += '\n';
    toolTip += 'Länge:' + aWaggon.renderingLength;
    return toolTip;
  }

  calculateTrackOriginX(aTrack: Track) {
    if (aTrack.parent == null) {
      return aTrack.xFrom;
    }
    return 100;
  }

  calculateTrackOriginY(aTrack: Track) {
    if (aTrack.parent == null) {
      return aTrack.yFrom;
    }
    return 100;
  }
}
