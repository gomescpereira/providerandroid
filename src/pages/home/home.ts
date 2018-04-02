import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { Geolocation } from '@ionic-native/geolocation';
import { User } from '@firebase/auth-types';

declare var google;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  user= {} as any;

  constructor(public navCtrl: NavController,
    private ofAuth: AngularFireAuth,
    public navParams: NavParams,
    private geolocation: Geolocation,
    private toast: ToastController) {
    
  }

  ionViewDidLoad() {
   // this.loadMap2();
    this.ofAuth.authState.subscribe(data =>  {
      if(data && data.email && data.uid){
      this.toast.create({
        message: 'Welcome to Prestadores: ' + data.email,
        duration: 3000
       
      }).present();

       
      this.user.email = data.email;
      
    } 
    else {
     console.log('Erro')
    }
    });
    
  this.geolocation.getCurrentPosition()
   .then((resp) => {

  this.user.latitude = resp.coords.latitude;
  this.user.longitude = resp.coords.longitude;
   //const position = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
   console.log(this.user.latitude);
}).catch((error) => {
  console.log('Erro ao recuperar posição', error);
 
 });

  }

  clientes() {
    this.navCtrl.push('ProvidersPage' );
  }
  

  editContact() {
    // Maneira 1
    this.navCtrl.push('ContactPage');

    // Maneira 2
    // this.navCtrl.push('ContactEditPage', { key: contact.key });
  }

  Prestadores(){
      // Maneira 1
      this.navCtrl.push('ListaProviderPage',{ user: this.user });
  }

}
