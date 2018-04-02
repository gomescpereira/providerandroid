import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { PrestadorProvider } from '../../providers/prestador/prestador';
import { User } from '../../models/user';


/**
 * Generated class for the ListaProviderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lista-provider',
  templateUrl: 'lista-provider.html',

})
export class ListaProviderPage {
  contacts: Observable<any>;
  model: User;

  constructor(public navCtrl: NavController,   public navParams: NavParams,
  private provider: PrestadorProvider, private toast : ToastController) {
   // this.model =   this.navParams.data.User;
    //console.log(this.model.email);
    this.contacts = this.provider.getAll();

  }

  newContact() {
    this.navCtrl.push('ProviderEditPage');
  }

  editContact(contact: any) {
    this.navCtrl.push('ProviderEditPage', { contact: contact });
  }

  removeContact(key: string){
    if (key) {
      this.provider.remove(key)
      .then(() => {
        this.toast.create({ message: 'Contato removido sucesso.', duration: 3});
      })
      .catch(() => {
        this.toast.create({ message: 'Contato removido sucesso.', duration: 3});
      });
    }
  }

}