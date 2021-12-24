import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DetalhamentoGuard implements CanActivate {

  public urlMenu: UrlTree
  constructor(router: Router) {
    this.urlMenu = router.parseUrl("/menu-principal")
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.existePersonagemLocalStorage()) {
      return true;
    } else {
      return this.urlMenu
    }
  }

  existePersonagemLocalStorage(): boolean {
    const pers = localStorage.getItem("personagem")
    return !!pers
  }
  
}
