import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Atendente } from '../../models/atendente';
import 'rxjs/add/operator/map';
import { AngularFireDatabase  } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseApp } from 'angularfire2';
import * as firebase from 'firebase';

/*
  Generated class for the PrestadorProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PrestadorProvider {

  private PATH  ='prestadores/';
  
  private prestador: Atendente;

  constructor(private db: AngularFireDatabase,
    private angularFireAuth: AngularFireAuth, 
    private fb: FirebaseApp
  ) {
    
  }

  getAll(){
    return this.db.list(this.PATH, ref =>  ref.orderByChild('nome'))
    .snapshotChanges()
    .map(changes => { return changes.map(c => ({ key: c.payload.key,...c.payload.val()}));
   })
  }


  get(key: string){
    return this.db.object(this.PATH + key)
    .snapshotChanges()
    .map(c => { return { key: c.key, ...c.payload.val()};
    
   });
  }


  save(contact: Atendente) {
    return new Promise((resolve, reject) => {
      if (contact.key) {
        this.db.list(this.PATH)
        .update(contact.key, contact)
        .then(() => resolve())
        .catch((e) => reject(e));
      } else {
        this.db.list(this.PATH)
        .push(contact)
        .then(() => resolve());
      }
    })
  }

//  public uploadAndSave(item: Atendente) {

  public uploadAndSave(item: any) {
    let contact = { key: item.key, nome: item.nome, email: item.email, categoria: item.categoria, descricao: item.descricao, latitude: item.latitude, longitude: item.longitude, status: item.status,  url: '', fullPath: '' };

    if (item.key) {
      this.save(contact);
    } else {
      let storageRef = this.fb.storage().ref();
      let basePath = this.PATH + this.angularFireAuth.auth.currentUser.uid;
      contact.fullPath = basePath + '/' + contact.nome + '.png';
      let uploadTask = storageRef.child(contact.fullPath).putString(item.fileToUpload, 'base64');

      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot) => {
        
        //var progress = ( snapshotbytesTransferred / snapshot.totalBytes) * 100;
        console.log("% Terminou");
      },
      (error) => {
        console.error(error);
      },
      () => {
        contact.url = uploadTask.snapshot.downloadURL;
        this.save(contact);
      });
    }
  }

  remove(key: string){
    return this.db.list(this.PATH).remove(key);
    
  }

  public removeFile(fullPath: string) {
    let storageRef = this.fb.storage().ref();
    storageRef.child(fullPath).delete();
  } 

}
