import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireModule, FirebaseAppProvider } from "angularfire2";

import { filterQueryId } from '@angular/core/src/view/util';
import { FirebaseAuth } from '@firebase/auth-types';
import { HomePage } from '../home/home';
import { RegistrarPage } from '../registrar/registrar';

//import { Facebook } from '@ionic-native/facebook';
//import firebase from 'firebase';


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  user = {} as any;
  informa: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private ofAuth: AngularFireAuth,
  ) {
  }

  async login(user: any) {
    try {
      const result = await this.ofAuth.auth.signInWithEmailAndPassword(user.email, user.password);
      console.log(result);
      if (result) {
        this.navCtrl.push(HomePage);
        
      }
    } catch (e) {
      console.error(e);
    }

  }

  register(){
    this.navCtrl.push('RegistrarPage');
  }
}
