import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { YardViewComponent } from './yard-view/yard-view.component';
import { DragItPleaseComponent } from './drag-it-please/drag-it-please.component';
import {TrackPositioner} from './shared/track-positioner';
import { TrackViewComponent } from './track-view/track-view.component';

@NgModule({
  declarations: [
    AppComponent,
    YardViewComponent,
    DragItPleaseComponent,
    TrackViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [TrackPositioner],
  bootstrap: [AppComponent]
})
export class AppModule { }
