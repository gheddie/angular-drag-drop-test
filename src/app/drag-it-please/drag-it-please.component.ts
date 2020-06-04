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

  public draggableItems: Item[] = [];

  public droppedItemsHash: Map<string, Item[]>;

  public actuallyDragged: Item;

  public dropZones: string[] = ['DZ1', 'DZ2'];

  public dropTargets: string[] = ['DT1', 'DT2', 'DT3', 'DT4'];

  waggons: Array<Waggon> = [
    // T1
    new Waggon('123', 10, 10, 'T1', 0, 25),
    new Waggon('234', 50, 50, 'T1', 1, 50),
    new Waggon('345', 90, 90, 'T1', 2, 50),
  ];

  constructor() {
    // ...
  }

  ngOnInit(): void {

    this.droppedItemsHash = new Map<string, Item[]>();

    this.draggableItems = [
      { text: 'Item 1', color: 'white', left: 0, top: 100 },
      { text: 'Item 2', color: 'white', left: 100, top: 100 },
      { text: 'Item 3', color: 'white', left: 200, top: 100 },
      { text: 'Item 4', color: 'white', left: 300, top: 100 }
    ];
  }
  public dragStart(event: DragEvent, item: Item){
    console.log('drag start: ' + item.text);
    this.actuallyDragged = item;
  }

  public dragEnd(event: DragEvent, item: Item){
    console.log('drag end: ' + item.text);
    this.actuallyDragged = undefined;
  }

  public dragOver(event: DragEvent){
    // console.log('drag over...');
    if(this.actuallyDragged){
      event.preventDefault();
    }
  }

  getDraggableItems() {
    return this.draggableItems;
  }

  public drop(event: DragEvent) {

    const index = this.draggableItems.indexOf(this.actuallyDragged);
    // console.log('[zone=' + dropZone + '] drop at index: ' + index);
    this.draggableItems.splice(index, 1);

    // ---

    /*
    // add dropped item to dropped item hash...
    if (this.droppedItemsHash.get(dropZone) == null) {
      this.droppedItemsHash.set(dropZone, []);
    }
    this.droppedItemsHash.get(dropZone).push(this.actuallyDragged);
    for (const key of this.droppedItemsHash.keys()) {
      console.log(this.droppedItemsHash.get(key).length + ' items in drop zone ' + key + ':');
      for (const item of this.droppedItemsHash.get(key)) {
        console.log(item);
      }
    }
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
}
