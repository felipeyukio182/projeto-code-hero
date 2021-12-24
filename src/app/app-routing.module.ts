import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuPrincipalComponent } from './components/menu-principal/menu-principal.component';

const routes: Routes = [
  {
    path: "**",
    redirectTo: "menu-principal"
  },
  {
    path: "menu-principal",
    component: MenuPrincipalComponent,
    
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
