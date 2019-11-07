import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { AuthService } from './auth.service';


/*
Http Interceptor is basically used to intercept the request from client to server and adds the token and then
send it to the server. Here, the intension is to verify the token with the server. With AuthGuard, we were 
verifying the token with localstorage. But it is always essential to verify the token with the server.
 */
@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private injector: Injector) { }

  intercept(req, next){
    let authService = this.injector.get(AuthService);
    let tokenizedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authService.getToken()}`
      }
    })

    return next.handle(tokenizedReq);
  }
}
