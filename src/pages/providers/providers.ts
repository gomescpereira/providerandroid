import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { PrestadorProvider } from '../../providers/prestador/prestador';

/**
 * Generated class for the ProvidersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-providers',
  templateUrl: 'providers.html',
})
export class ProvidersPage {
  contacts: Observable<any>;
  constructor(public navCtrl: NavController,
  private provider:  PrestadorProvider, private toast : ToastController) {
     this.contacts = this.provider.getAll();
     console.log(this.contacts);
  }

  
  


itemSelected(contato):void {
    console.log(contato.nome);
    this.navCtrl.push('SolicitaPage', {
      parametroReferenciaEnviado: contato
    });

  }    


}
