import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SolicitaPage } from './solicita';

@NgModule({
  declarations: [
    SolicitaPage,
  ],
  imports: [
    IonicPageModule.forChild(SolicitaPage),
  ],
})
export class SolicitaPageModule {}
