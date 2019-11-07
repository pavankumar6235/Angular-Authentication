import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

/*
AuthGuard is basically a piece of code which controls the navigations to and from the component. In our case,
we are using it to allow user to access special event only if the token is present in the local storage. 
Otherwise, the user will be navigated to the login screen.
*/

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate  {

  constructor(private auth:AuthService, private router: Router){}

  canActivate() :boolean{
    if(this.auth.loggedIn()){
      return true;
    }
    else{
      this.router.navigate(['/login']);
      return false;
    }
  }
  
}
