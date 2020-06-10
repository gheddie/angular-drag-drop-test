import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TrackViewComponent} from './track-view/track-view.component';


const routes: Routes = [
  {path: 'trackview', component: TrackViewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
