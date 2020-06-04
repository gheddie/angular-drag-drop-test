import { Component, OnInit } from '@angular/core';
import {Item} from '../shared/item';
import {Waggon} from '../shared/waggon';

// https://entwickler.de/online/javascript/angular-d3-js-drag-drop-579852258.html

@Component({
  selector: 'app-drag-it-please',
  templateUrl: './drag-it-please.component.html',
  styleUrls: ['./drag-it-please.component.css']
})
export class DragItPleaseComponent implements OnInit {

  public droppedItemsHash: Map<string, Item[]>;

  public actuallyDragged: Waggon;

  public dropZones: string[] = ['DZ1', 'DZ2'];

  public dropTargets: string[] = ['DT1', 'DT2', 'DT3', 'DT4'];

  public waggons: Waggon[] = [];

  constructor() {
    // ...
  }

  ngOnInit(): void {

    this.droppedItemsHash = new Map<string, Item[]>();

    this.waggons = [
      // T1
      new Waggon('123', 10, 200, 'T1', 0, 25),
      new Waggon('234', 110, 250, 'T1', 1, 50),
      new Waggon('345', 210, 300, 'T1', 2, 50),
    ];
  }

  public dragStart(event: DragEvent, waggon: Waggon){
    console.log('drag start: ' + waggon.waggonNumber);
    this.actuallyDragged = waggon;
  }

  public dragEnd(event: DragEvent, waggon: Waggon){
    console.log('drag end: ' + waggon.waggonNumber);
    this.actuallyDragged = undefined;
  }

  public dragOver(event: DragEvent){
    // console.log('drag over...');
    if(this.actuallyDragged){
      event.preventDefault();
    }
  }

  public drop(event: DragEvent) {

    const index = this.waggons.indexOf(this.actuallyDragged);
    // console.log('[zone=' + dropZone + '] drop at index: ' + index);
    this.waggons.splice(index, 1);

    this.actuallyDragged = undefined;
  }

  getDroppedItems(identifier: string) {
    // console.log('get dropped items for identifier: ' + identifier);
    return this.droppedItemsHash.get(identifier);
  }

  waggonClicked(waggonNumber: string) {
    console.log('waggon clicked: ' + waggonNumber);
  }
}
