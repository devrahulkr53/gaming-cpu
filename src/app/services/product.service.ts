import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http: HttpClient
  ) { }

  getAllProducts(){
    let auth = `auth=${environment.auth}`
    return this.http.get(environment.firebaseConfig.databaseURL + `/products.json?${auth}`)
  }

  getProductById(id:string){
    let auth = `auth=${environment.auth}`
    return this.http.get(environment.firebaseConfig.databaseURL + `/products/${id}.json?${auth}`)
  }

  getProductByName(name:string){
    let auth = `auth=${environment.auth}`
    let query = `orderBy="name"&startAt="${name}"`
    return this.http.get(environment.firebaseConfig.databaseURL + `/products.json?${auth}&${query}`)
  }
}
