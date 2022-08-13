import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MetronomeComponent } from './metronome/metronome.component';

const routes: Routes = [
  {
    path: '',
    component: MetronomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
