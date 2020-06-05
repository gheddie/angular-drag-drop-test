import { Component, OnInit } from '@angular/core';
import {Item} from '../shared/item';
import {Waggon} from '../shared/waggon';
import {Track} from '../shared/track';
import {Point} from '../shared/point';
import {TrackPositioner} from '../shared/track-positioner';
import {ShuntingOrder} from '../shared/shunting-order';

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

  public shuntingOrders: ShuntingOrder[] = [];

  public selectedWaggons: Waggon[] = [];

  private trackPositioner: TrackPositioner;

  constructor(aTrackPositioner: TrackPositioner) {
    this.trackPositioner = aTrackPositioner;
  }

  ngOnInit(): void {

    this.droppedItemsHash = new Map<string, Item[]>();

    this.shuntingOrders = [
      new ShuntingOrder(),
      new ShuntingOrder(),
      new ShuntingOrder()
    ];

    const waggonsT1 = [
      new Waggon('T1_1', 25),
      new Waggon('T1_2', 50),
      new Waggon('T1_3', 50),
      new Waggon('T1_4', 50),
      new Waggon('T1_5', 50)
    ];

    const waggonsT2 = [
      new Waggon('T2_1', 25),
      new Waggon('T2_2', 50),
      new Waggon('T2_3', 50),
      new Waggon('T2_4', 67),
      new Waggon('T2_5', 50),
      new Waggon('T2_6', 66),
      new Waggon('T2_7', 50)
    ];

    const waggonsT3 = [
      new Waggon('T3_1', 25),
      new Waggon('T3_2', 83),
      new Waggon('T3_3', 36),
      new Waggon('T3_4', 82)
    ];

    const waggonsT4 = [
      new Waggon('T4_1', 25),
      new Waggon('T4_2', 83),
      new Waggon('T4_3', 114),
      new Waggon('T4_4', 50),
      new Waggon('T4_5', 67),
      new Waggon('T4_6', 50)
    ];

    const waggonsT5 = [
      new Waggon('T5_1', 25),
      new Waggon('T5_2', 32),
      new Waggon('T5_3', 94),
      new Waggon('T5_4', 73),
      new Waggon('T5_5', 50)
    ];

    const waggonsT6 = [
      new Waggon('T6_1', 25),
      new Waggon('T6_2', 72),
      new Waggon('T6_3', 156),
      new Waggon('T6_4', 67)
    ];

    const waggonsT7 = [
      new Waggon('T7_1', 25),
      new Waggon('T7_2', 50),
      new Waggon('T7_3', 67),
      new Waggon('T7_4', 104),
      new Waggon('T7_5', 98),
      new Waggon('T7_6', 45)
    ];

    const waggonsT8 = [
      new Waggon('T8_1', 25),
      new Waggon('T8_2', 116),
      new Waggon('T8_3', 50),
      new Waggon('T8_4', 67),
      new Waggon('T8_5', 83)
    ];

    const t1 = new Track('T1', 500, 200, 0, waggonsT1, 341, null, 0);
    const t2 = new Track('T2', 50, 200, 0, waggonsT2, 590, null, 1);
    const t3 = new Track('T3', 50, 200, 0, waggonsT3, 300, null, 2);
    const t4 = new Track('T4', 50, 200, 0, waggonsT4, 800, null, 3);
    const t5 = new Track('T5', 50, 200, 0, waggonsT5, 650, null, 4);
    const t6 = new Track('T6', 50, 200, 0, waggonsT6, 612, null, 5);
    const t7 = new Track('T7', 50, 200, 0, waggonsT7, 480, null, 6);
    const t8 = new Track('T8', 50, 200, 0, waggonsT8, 720, null, 7);

    this.tracks = [
      t1, t2, t3, t4, t5, t6, t7, t8
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
    if (this.actuallyDragged){
      event.preventDefault();
    }
  }

  public dropWaggonToWaggon(event: DragEvent, targetWaggon: Waggon) {

    console.log('dropped waggon ' + this.actuallyDragged.waggonNumber + ' to waggon '
      + targetWaggon.waggonNumber + ' [target track=' + targetWaggon.track.trackNumber + '].');

    this.moveWaggonToWaggon(this.actuallyDragged, targetWaggon);

    this.createShuntingOrder();

    this.actuallyDragged = undefined;
    this.debugTrackWaggons();
  }

  public dropWaggonToTrack(event: DragEvent, targetTrack: Track) {

    console.log('dropped waggon ' + this.actuallyDragged.waggonNumber + ' to track ' + targetTrack.trackNumber + '.');

    this.moveWaggonToTrack(this.actuallyDragged, targetTrack);

    this.createShuntingOrder();

    this.actuallyDragged = undefined;

    // this.debugTrackWaggons();
  }

  getDroppedItems(identifier: string) {
    // console.log('get dropped items for identifier: ' + identifier);
    return this.droppedItemsHash.get(identifier);
  }

  waggonClicked(aWaggon: Waggon) {
    aWaggon.toggleSelection();
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
    toolTip += 'Gleis-Nr.: ' + aTrack.trackNumber;
    toolTip += '\n';
    toolTip += 'Länge (gesamt): ' + aTrack.lenght;
    toolTip += '\n';
    toolTip += 'Länge (frei): ' + aTrack.calculateUsableLenght();
    return toolTip;
  }

  generateWaggonToolTip(aWaggon: Waggon) {
    let toolTip = '';
    toolTip += 'Waggen-Nr.: ' + aWaggon.waggonNumber;
    toolTip += '\n';
    toolTip += 'Länge: ' + aWaggon.renderingLength;
    return toolTip;
  }

  calculateTrackOriginX(aTrack: Track) {

    return 10;

    // ---

    /*
    const result = this.trackPositioner.calculateX(aTrack);
    console.log('calulated x for track ' + aTrack.trackNumber + ' : ' + result);
    return result;
    */

    // ---

    /*
    if (aTrack.parent == null) {
      return aTrack.xFrom;
    }
    return new Point(aTrack.parent.xFrom, aTrack.parent.yFrom)
      .calculateFollowingPoint(aTrack.parent.rotation, aTrack.parent.lenght).x;
      */
  }

  calculateTrackOriginY(aTrack: Track) {

    return 10 + (aTrack.index * 20);

    /*
    const result = this.trackPositioner.calculateY(aTrack);
    console.log('calulated y for track ' + aTrack.trackNumber + ' : ' + result);
    return result;
    */

    // ---

    /*
    if (aTrack.parent == null) {
      return aTrack.yFrom;
    }
    return new Point(aTrack.parent.xFrom, aTrack.parent.yFrom)
      .calculateFollowingPoint(aTrack.parent.rotation, aTrack.parent.lenght).y;
      */
  }

  getWaggonRenderingColor(aWaggon: Waggon) {
    if (aWaggon.selected) {
      return 'lightgray';
    }
    return 'white';
  }

  private createShuntingOrder() {
    // this.shuntingOrders.push(new ShuntingOrder());
  }

  // ---

  moveWaggonToWaggon(sourceWaggon: Waggon, targetWaggon: Waggon) {

    const droppedWaggon = sourceWaggon;
    // remove waggon from source track...
    targetWaggon.track.removeWaggon(droppedWaggon);
    // add waggon to target track...
    targetWaggon.track.waggons.splice((targetWaggon.track.waggons.indexOf(targetWaggon) + 1), 0, droppedWaggon);
    droppedWaggon.track = targetWaggon.track;
  }

  moveWaggonToTrack(sourceWaggon: Waggon, targetTrack: Track) {

    const droppedWaggon = sourceWaggon;
    // remove waggon from source track...
    targetTrack.removeWaggon(this.actuallyDragged);
    // add waggon to target track...
    targetTrack.waggons.push(this.actuallyDragged);
    droppedWaggon.track = targetTrack;
  }
}
