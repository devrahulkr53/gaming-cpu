import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AppComponent } from '../app.component';

class LocalStorage implements Storage {
  [name: string]: any;
  readonly length: number = 0;
  clear(): void {}
  getItem(key: string): string | null {return null;}
  key(index: number): string | null {return null;}
  removeItem(key: string): void {}
  setItem(key: string, value: string): void {}
}
@Injectable({
  providedIn: 'root'
})
export class AuthService implements Storage {
  
  userData:BehaviorSubject<any> = new BehaviorSubject<any>(null);
  isDark:BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private storage: Storage;
  [name: string]: any;
  length: number = 0;

  constructor(
    private http:HttpClient,
    private router:Router
  ) {
    this.storage = new LocalStorage();

    AppComponent.isBrowser.subscribe(isBrowser => {
      if (isBrowser) {
        this.storage = localStorage;
      }
    });
  }

  get isLoggedIn():boolean {
    return this.userData?.value?.accessToken ? true : false;
  }

  get currentUser():any {
    return this.userData?.value;
  }

  // login(data:any):Observable<any> {
  //   return this.http.post(environment.apiUrl+'usermodule/login/',data)
  // }

  // register(data:any):Observable<any> {
  //   return this.http.post(environment.apiUrl+'usermodule/register/',data)
  // }

  handleAuthentication(accessToken:string | null, data:any = null){
    this.userData.next({accessToken, data})
    accessToken && this.setItem('accessToken',accessToken)
    accessToken && this.setItem('userData',JSON.stringify(data))
  }

  autoLogin(){
    let accessToken = this.getItem('accessToken');
    let data = JSON.parse(this.getItem('userData') as string);
    this.handleAuthentication(accessToken, data)
  }

  autoTheming(){
    let data = this.getItem('currentTheme') === 'true' ? true : false;
    this.isDark.next(data)
  }

  logout(){
    this.userData.next(null);
    this.removeItem('accessToken');
    this.removeItem('userData');
    this.router.navigateByUrl('/auth')
  }


  // Local Storage
  

  clear(): void {
    this.storage.clear();
  }

  getItem(key: string): string | null {
    return this.storage.getItem(key);
  }

  key(index: number): string | null {
    return this.storage.key(index);
  }

  removeItem(key: string): void {
    return this.storage.removeItem(key);
  }

  setItem(key: string, value: string): void {
    return this.storage.setItem(key, value);
  }

}
