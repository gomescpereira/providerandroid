import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { PrestadorProvider } from '../../providers/prestador/prestador';
import { ImagePicker } from '@ionic-native/image-picker';
import { error } from '@firebase/database/dist/esm/src/core/util/util';
import { CategoriesProvider } from '../../providers/categories/categories';
/**
 * Generated class for the ProviderEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-provider-edit',
  templateUrl: 'provider-edit.html',
})
export class ProviderEditPage {

  title: string;
  form: FormGroup;
  contact: any;
  imgPath: string;
  fileToUpload: any;
  public lista = new Array<any>();

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private formBuilder: FormBuilder, private provider: PrestadorProvider,
    private imagePicker: ImagePicker,
    public providerC: CategoriesProvider,
    private toast: ToastController) {
      this.contact = this.navParams.data.contact || { };
      this.imgPath = '';
      
      //this.contact.nome = 'Carlos Eduardo';
      this.createForm();
  
      
  
      this.setupPageTitle();
  }

  ionViewDidLoad() {
    
    this.providerC.getPrestadores().map(res => res.json()).subscribe(
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

  private setupPageTitle() {
    this.title = this.navParams.data.contact ? 'Alterando Prestador' : 'Novo Prestador';
  }

  createForm() {
    this.form = this.formBuilder.group({
      key: [this.contact.key],
      nome: [this.contact.nome, Validators.required],
      url: [this.contact.url],
      fullPath: [this.contact.fullPath],
      categoria: [this.contact.categoria],
      descricao: [this.contact.descricao, Validators.required],
      email: [this.contact.email, Validators.required],
      tel: [this.contact.tel, Validators.required],
      status: [this.contact.status]
      
    });
  }

 

  onSubmit() {
    if (this.form.valid) 
    {
      this.provider.save(this.form.value)
        .then(() => {
          this.toast.create({ message: 'Contato salvo com sucesso.', duration: 3000 }).present();
         this.navCtrl.pop();
        })
        
    }
  }

 escolherFotos2() {

   this.imagePicker.hasReadPermission()
   .then(hasPermission => {
   if (hasPermission) {
     this.pegarImagem(); // pegar a inage {
   } else {

     this.solicitarPermissao();// solicitar a permissao
   }

  }).catch(error => {
    console.error('Erro ao verificar permissão', error);

  
  });
 }

 escolherFoto() {

  this.toast.create({ message: 'Botão ainda não ativo', duration: 3000 }).present();
}
 
 solicitarPermissao() {
  this.imagePicker.requestReadPermission()
 .then(hasPermission => {
  if (hasPermission) {
    this.pegarImagem();
  } else {
    console.error('Permissão Negada');
    // solicitar a permissao
  }

 }).catch(error => {
   console.error('Erro ao verificar permissão', error);

 
 })
}

pegarImagem() {
  this.imagePicker.getPictures({
    maximumImagesCount: 1,
    outputType: 1 //Base 64
  })
 .then(results => {
  if (results.length > 0) {
    this.imgPath = 'data:image/png;base64,' + results[0];
    this.fileToUpload = results[0];
    // pegar a image {
  } else {
    this.imgPath = '';
    this.fileToUpload = null;
  
  }

 }).catch(error => {
   console.error('Erro ao recuperar imagem', error);

 
 })
}

}
