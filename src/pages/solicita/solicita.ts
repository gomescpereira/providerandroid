import { User } from './../../models/user';

//import { Solicitante } from './../../models/provider';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Guest } from '../../models/guest';
import {AngularFireAuth } from "angularfire2/auth";
import { CustomerProvider } from '../../providers/customer/customer';


/**
 * Generated class for the SolicitaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */



@IonicPage()




@Component({
  selector: 'page-solicita',
  templateUrl: 'solicita.html',
  providers: [
    CustomerProvider 
  ]
})

export class SolicitaPage {
  
  public item: any;
  public nome: string;
  public tecnico:Guest;
  user = {} as User;

  constructor(public navCtrl: NavController, public NavParams: NavParams,
    private ofAuth: AngularFireAuth,private toast: ToastController,
    public customerProvider : CustomerProvider){
   this.item = NavParams.get("parametroReferenciaEnviado");
   this.tecnico = new Guest();
   
  }

  ionViewDidLoad() { 
    this.ofAuth.authState.subscribe(data =>  {
      if(data && data.email && data.uid){
      this.toast.create({
        message: 'Welcome to APP_Name - '+ data.email,
        duration: 3000
       
      }).present();
      this.user.email = data.email;
      console.log('nome:'+ this.user.email);
      this.tecnico.email = this.user.email;
    } 
    else {
     console.log('Erro')
    }
  })

   this.tecnico.emailtecnico  = this.item['email'];

    this.tecnico.nmtecnico = this.item['nome'];

    
    console.log('lat:' + this.item['lng']);    

    this.tecnico.latitude = this.item['lat'];

    this.tecnico.longitude = this.item['lng'];

    
    
   
    console.log(this.item['nome']);
  }

  cadastrar(tecnico){
    this.tecnico.email = this.user.email;
    console.log(tecnico);
  
     this.customerProvider.add(tecnico);

  }
}




