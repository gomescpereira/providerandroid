import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProviderEditPage } from './provider-edit';

@NgModule({
  declarations: [
    ProviderEditPage,
  ],
  imports: [
    IonicPageModule.forChild(ProviderEditPage),
  ],
})
export class ProviderEditPageModule {}
