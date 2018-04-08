import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Categorie } from '../../models/categories';
import { CategoriesProvider } from '../../providers/categories/categories';

/**
 * Generated class for the CategoriaEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-categoria-edit',
  templateUrl: 'categoria-edit.html',
})
export class CategoriaEditPage {
  user = {} as Categorie;
  constructor(public navCtrl: NavController, public navParams: NavParams,
   private toast:  ToastController,
  private  provider: CategoriesProvider ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoriaEditPage');
  }

  register(user: any) {

    this.provider.add(user)
    .then(() => {
      this.toast.create({ message: 'Categoria salvo com sucesso.', duration: 3000 }).present();
     this.navCtrl.pop();
    })
    
  }
}

