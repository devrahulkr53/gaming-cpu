import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor(
    private http: HttpClient
  ) { }

  placeOrder(order:any){
    let auth = `auth=${environment.auth}`
    return this.http.post(environment.firebaseConfig.databaseURL + `/orders.json?${auth}`, order)
  }
  createProduct(order:any){
    let auth = `auth=${environment.auth}`
    return this.http.post(environment.firebaseConfig.databaseURL + `/products.json?${auth}`, order)
  }
}
