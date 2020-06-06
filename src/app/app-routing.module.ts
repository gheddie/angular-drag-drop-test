import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {YardViewComponent} from './yard-view/yard-view.component';
import {DragItPleaseComponent} from './drag-it-please/drag-it-please.component';
import {TrackViewComponent} from './track-view/track-view.component';


const routes: Routes = [
  {path: 'yard', component: YardViewComponent},
  {path: 'dragit', component: DragItPleaseComponent},
  {path: 'trackview', component: TrackViewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
