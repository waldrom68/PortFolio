import { HttpEvent, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subscription } from "rxjs";

import { AuthService } from "./auth.service";
import { DataService, AdminService } from "./data.service";
import { TokenService } from "./token.service";

// const LOGINUSER = new LoginUsuario("user", "user");

@Injectable({
    providedIn: 'root'
})
export class InterceptorService {
    isAdminSubscription: Subscription;  // esto es para poderlo eliminar
    isAdmin: boolean;  // el atributo que tendrá el valor actualizado
    isAdmin$: Observable<boolean>;

    constructor(
        private tokenService: TokenService,
        private authService: AuthService,
        private dataService: DataService,
        // PENDIENTE MODO PRUEBA
        private adminService: AdminService,
        // FIN MODO PRUEBA

    ) {

        this.isAdmin$ = this.dataService.getIsAdmin$();
        this.isAdmin$.subscribe(isAdmin => this.isAdmin = isAdmin);

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Se genera el headers con el token de sesion
        let intReq = req;
        const token = this.tokenService.getToken();

        // this.tokenService.isValidAdmin();

        if (token != null) {
            intReq = req.clone({
                headers: req.headers.set('Authorization', 'Bearer' + token)
            });
        }

        if (!this.tokenService.isValidAdmin()) {
            console.log("El interceptor notó que no está habilitado, elimina Token si es que existe y Desloguea");
            this.authService.logout();
            this.isAdmin = false;
            console.log("DESDE EL INTERCEPTOR, COLOCO FALSE")
            this.dataService.setIsAdmin(this.isAdmin);
            this.adminService.setCurrentAdmin( false );
        } else {
            console.log("DESDE EL INTERCEPTOR, COLOCO TRUE")
            this.isAdmin = true;
            this.dataService.setIsAdmin(this.isAdmin);
            this.adminService.setCurrentAdmin( true );
        };

        return next.handle(intReq);
    }
}

export const interceptorProvider = [{

    provide: HTTP_INTERCEPTORS,
    useClass: InterceptorService,
    multi: true

}]



