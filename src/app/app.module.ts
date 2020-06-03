import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { YardViewComponent } from './yard-view/yard-view.component';
import { DragItPleaseComponent } from './drag-it-please/drag-it-please.component';

@NgModule({
  declarations: [
    AppComponent,
    YardViewComponent,
    DragItPleaseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
