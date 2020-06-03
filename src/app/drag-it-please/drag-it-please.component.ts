import { Component, OnInit } from '@angular/core';
import {Item} from '../shared/item';
import {WaggonListHash} from '../shared/waggon-list-hash';

// https://entwickler.de/online/javascript/angular-d3-js-drag-drop-579852258.html

@Component({
  selector: 'app-drag-it-please',
  templateUrl: './drag-it-please.component.html',
  styleUrls: ['./drag-it-please.component.css']
})
export class DragItPleaseComponent implements OnInit {

  public draggableItems: Item[] = [];

  public droppedItems: Item[] = [];

  // public droppedItemsHash: WaggonListHash = {};
  public droppedItemsHash: Map<string, Item[]>;

  public actuallyDragged: Item;

  public dropZones: string[] = ['DZ1', 'DZ2'];

  public dropTargets: string[] = ['DT1', 'DT2', 'DT3', 'DT4'];

  constructor() {
    // ...
  }

  ngOnInit(): void {

    this.droppedItemsHash = new Map<string, Item[]>();

    /*
    this.droppedItemsHash.hallo = [];
    this.droppedItemsHash.knallo = [];

    this.droppedItemsHash.hallo.push({ text: 'Item 1', color: 'red', left: 0, top: 0 }, { text: 'Item 1', color: 'red', left: 0, top: 0 });
    this.droppedItemsHash.knallo.push({ text: 'Item 1', color: 'red', left: 0, top: 0 });

    console.log('hallo: ' + this.droppedItemsHash.hallo.length);
    console.log('knallo: ' + this.droppedItemsHash.knallo.length);
    */

    // ---

    this.draggableItems = [
      { text: 'Item 1', color: 'red', left: 0, top: 0 },
      { text: 'Item 2', color: 'green', left: 0, top: 50 },
      { text: 'Item 3', color: 'yellow', left: 0, top: 100 },
      { text: 'Item 4', color: 'black', left: 0, top: 150 }
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

  // ---

  public drop(event: DragEvent, dropZone: string){
    const index = this.draggableItems.indexOf(this.actuallyDragged);
    console.log('[zone=' + dropZone + '] drop at index: ' + index);
    this.draggableItems.splice(index, 1);
    this.droppedItems.push(this.actuallyDragged);

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

    this.actuallyDragged = undefined;
  }

  getDroppedItems(identifier: string) {
    console.log('get dropped items for identifier: ' + identifier);
    // return this.droppedItems;
    return this.droppedItemsHash.get(identifier);
  }
}
