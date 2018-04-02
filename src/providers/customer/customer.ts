
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Guest } from '../../models/guest';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the CustomerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CustomerProvider {
  items: Observable<Guest[]>;
  private pathref = this.db.list<Guest>('clientes');
  constructor(private db: AngularFireDatabase) {
    this.items = db.list<Guest>('itens').valueChanges();

  }

   GetList() {
    return this.pathref;
    }
    
    add(item: Guest) {
    
      return this.pathref.push(item);
    }
    
  }