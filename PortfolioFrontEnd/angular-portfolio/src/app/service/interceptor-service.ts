import { HttpEvent, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { AuthService } from "./auth.service";
import { TokenService } from "./token.service";

// const LOGINUSER = new LoginUsuario("user", "user");

@Injectable({
    providedIn: 'root'
})
export class InterceptorService {

    constructor( 
        private tokenService: TokenService,
        private authService: AuthService,
        ) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Se genera el headers con el token de sesion
        let intReq = req;
        const token = this.tokenService.getToken();
        
        // this.tokenService.isValidAdmin();

        if (token != null) {
            intReq = req.clone({
                headers: req.headers.set('Authorization','Bearer'+token)
            });
        }

        if (!this.tokenService.isValidAdmin()) {
         console.log("El interceptor notó que no está habilitado, elimina Token si es que existe y Desloguea");
         this.authService.logout();

        };

        return next.handle(intReq);
    }
}

export const interceptorProvider = [{

        provide: HTTP_INTERCEPTORS,
        useClass: InterceptorService,
        multi: true

}]



