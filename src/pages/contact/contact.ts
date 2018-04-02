import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { ContactProvider } from '../../providers/contact/contact';

/**
 * Generated class for the ContactPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
})
export class ContactPage {

  contacts: Observable<any>;
  constructor(public navCtrl: NavController,
  private provider: ContactProvider, private toast : ToastController) {
     this.contacts = this.provider.getAll();
  }

  newContact() {
    this.navCtrl.push('ContactEditPage');
  }

  editContact(contact: any) {
    this.navCtrl.push('ContactEditPage', { contact: contact });
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
