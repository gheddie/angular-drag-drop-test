import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {YardViewComponent} from './yard-view/yard-view.component';
import {DragItPleaseComponent} from './drag-it-please/drag-it-please.component';


const routes: Routes = [
  {path: 'yard', component: YardViewComponent},
  {path: 'dragit', component: DragItPleaseComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
