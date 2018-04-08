import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http'
import { Categorie } from '../../models/categories';

/*
  Generated class for the CategoriesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CategoriesProvider {
  
  baseApiPah = "https://j4zhyiyx33.execute-api.sa-east-1.amazonaws.com/latest/category";
  public model: any;
  categories: any[];
  Item: Categorie = {
    id:  "",
    name: ""
    
  }
 
  
  constructor(public http: Http) {
    console.log('Hello CategoriesProvider Provider');
    
  }

  

  
  
  
   
    add2(model: any) {
     this.Item.id = model.id;
     this.Item.name = model.name;
     console.log(model);
     return this.http.post(this.baseApiPah, this.Item);
    }
    
  
    add(model:any){
      return new Promise((resolve, reject) => {
        var data = {
          id: model.id,
          name: model.name
        };
   
        this.http.post(this.baseApiPah, data)
          .subscribe((result: any) => {
            resolve(result.json());
            
          },
          (error) => {
            reject(error.json());
          });
      });
    }
 
  

  getPrestadores() {
    
   //return  this.http.get(this.baseApiPah +"tecnico/tecnicos");
   //return  this.http.get("http://eccoengmdp.hopto.org:8100/uso/api/tecnico/ConsultarTecnicos");
   return  this.http.get("https://j4zhyiyx33.execute-api.sa-east-1.amazonaws.com/latest/category");
   
  }
}
