
import { Injectable } from '@angular/core';

import {SQLite, SQLiteObject } from '@ionic-native/sqlite';

/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DatabaseProvider {

  constructor(private sqlite: SQLite) {
  }

  public getDB(){
    return this.sqlite.create({
      name: 'prestadores.db',
      location: 'default'
    })
  }


 public createDatabase() {
return this.getDB()
.then((db: SQLiteObject)  => {
 this.createTables(db);
 this.insertDefautItems(db);
})
.catch((e => console.error(e)));

  }


  private createTables(db: SQLiteObject){
   db.sqlBatch([
     ['CREATE TABLE IF NOT EXISTS categories (id integer primary key AUTOINCREMENT NOT NULL, name TEXT)'],
     ['CREATE TABLE IF NOT EXISTS prestador (id integer primary key AUTOINCREMENT NOT NULL, nome TEXT,duedate DATE, active integer, category_id integer, FOREIGN KEY(categoria_id) REFERENCES categories(id) )'],
     

   ])
   .then(() => console.log('Tabelas criadas'))
   .catch(e => console.error('Erro ao criar tabelas',e));
  }


  private insertDefautItems(db: SQLiteObject){
    db.executeSql('select COUNT(id) as qrd from categories' , {})
    .then((data: any) => {
      if (data.rows.item(0).qtd == 0) {
      db.sqlBatch([
        ['insert into categories (name) values (?)', ['Engengeiro Eletronico']],
        ['insert into categories (name) values (?)', ['Engengeiro Projetos']],
        ['insert into categories (name) values (?)', ['Engengeiro Civil']],
        ['insert into categories (name) values (?)', ['Técnico Eletronico']],
        ['insert into categories (name) values (?)', ['Técnico Eletrotécnica']],
        ['insert into categories (name) values (?)', ['Engengeiro Processos']],
        ['insert into categories (name) values (?)', ['Engengeiro Mecânico']]
      ])
       .then(() => console.log('Dados padrão incluidos' ))
       .catch(e => console.error('Erro ao incluir dados padroes', e));
    }
     })
    }
}


