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

  static readonly DROPZONE_WIDTH = 5;

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
      new Waggon('123', 10, 10, 'T1', 0, 25),
      new Waggon('234', 110, 10, 'T1', 1, 50)
    ];

    const waggonsT2 = [
      new Waggon('345', 210, 10, 'T2', 0, 50)
    ];

    const waggonsT3 = [];

    this.tracks = [
      new Track('T1', 0, 100, 0, 0, 0, waggonsT1, 400),
      new Track('T2', 0, 200, 0, 0, 0, waggonsT2, 300),
      new Track('T3', 0, 300, 0, 0, 0, waggonsT3, 200),
      new Track('T4', 0, 400, 0, 0, 0, null, 550)
    ];
  }

  public dragStart(event: DragEvent, waggon: Waggon){
    // console.log('drag start: ' + waggon.waggonNumber);
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

  public drop(event: DragEvent, targetWaggon : Waggon) {

    console.log('dropped waggon ' + this.actuallyDragged.waggonNumber + ' [target=' + targetWaggon.waggonNumber + '].');

    /*
    const index = this.waggons.indexOf(this.actuallyDragged);
    // console.log('[zone=' + dropZone + '] drop at index: ' + index);
    this.waggons.splice(index, 1);
    */

    this.actuallyDragged = undefined;
  }

  getDroppedItems(identifier: string) {
    // console.log('get dropped items for identifier: ' + identifier);
    return this.droppedItemsHash.get(identifier);
  }

  waggonClicked(waggonNumber: string) {
    console.log('waggon clicked: ' + waggonNumber);
  }

  calculateWaggonOffsetOnTrack(waggon: Waggon) {
    let result = 0;
    // console.log('calculate waggon offset on track: ' + waggon.waggonNumber);
    const index = waggon.track.waggons.indexOf(waggon);
    for (let i = 0; i < index; i++) {
      // console.log('regarding waggon: ' + waggon.track.waggons[i].waggonNumber);
      result += waggon.track.waggons[i].renderingLength + DragItPleaseComponent.DROPZONE_WIDTH + 20;
    }
    return result;
  }

  calculateDropzoneOffsetOnTrack(waggon: Waggon) {
    return this.calculateWaggonOffsetOnTrack(waggon) + waggon.renderingLength + DragItPleaseComponent.DROPZONE_WIDTH;
  }

  isLastWaggonOnTrack(waggon: Waggon) {
    return (waggon.track.waggons.indexOf(waggon) === waggon.track.waggons.length - 1);
  }

  calculateDropzoneLenght(waggon: Waggon) {
    if (this.isLastWaggonOnTrack(waggon) || this.isTrackEmpty(waggon.track)) {
      return this.getEmptyTrackLenght(waggon);
    }
    return 15;
  }

  getEmptyTrackLenght(waggon: Waggon) {
    let occupiedTrackLenght = 0;
    for (const w of waggon.track.waggons) {
      occupiedTrackLenght += w.renderingLength + DragItPleaseComponent.DROPZONE_WIDTH + 20;
    }
    return (waggon.track.lenght - occupiedTrackLenght);
  }

  private isTrackEmpty(track: Track) {
    return (track.waggons == null || track.waggons.length === 0);
  }
}
