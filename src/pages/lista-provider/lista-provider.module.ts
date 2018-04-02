import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListaProviderPage } from './lista-provider';

@NgModule({
  declarations: [
    ListaProviderPage,
  ],
  imports: [
    IonicPageModule.forChild(ListaProviderPage),
  ],
})
export class ListaProviderPageModule {}
