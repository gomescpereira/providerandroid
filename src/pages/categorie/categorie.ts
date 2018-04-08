import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CategoriesProvider } from '../../providers/categories/categories';

/**
 * Generated class for the CategoriePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-categorie',
  templateUrl: 'categorie.html',
})
export class CategoriePage {
  categories: any[];
  public lista = new Array<any>();
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public provider: CategoriesProvider) {
  }

  ionViewDidLoad() {
    
    this.provider.getPrestadores().map(res => res.json()).subscribe(
      data => {
        //const response = (data as any);
        //const obj_retorno = JSON.parse(response._body); 
 
         this.lista = data;
         
       console.log(this.lista);
      }, error => {
        console.log(error);
      }
      
       );
  }

  newCategoria() {
    this.navCtrl.push('CategoriaEditPage');
  }

  editContact(contact: any) {
    this.navCtrl.push('CategoriaEditPage', { contact: contact });
  }

}
