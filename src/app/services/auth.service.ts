import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData:BehaviorSubject<any> = new BehaviorSubject<any>(null);
  isDark:BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(
    private http:HttpClient,
    private router:Router
  ) {
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
    accessToken && localStorage.setItem('accessToken',accessToken)
    accessToken && localStorage.setItem('userData',JSON.stringify(data))
  }

  autoLogin(){
    let accessToken = localStorage.getItem('accessToken');
    let data = JSON.parse(localStorage.getItem('userData') as string);
    this.handleAuthentication(accessToken, data)
  }

  autoTheming(){
    let data = localStorage.getItem('currentTheme') === 'true' ? true : false;
    this.isDark.next(data)
  }

  logout(){
    this.userData.next(null);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userData');
    this.router.navigateByUrl('/auth')
  }

}
