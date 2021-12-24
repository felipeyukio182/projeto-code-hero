import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetalhamentoComponent } from './components/detalhamento/detalhamento.component';
import { MenuPrincipalComponent } from './components/menu-principal/menu-principal.component';
import { DetalhamentoGuard } from './guard/detalhamento.guard';

const routes: Routes = [
  {
    path: "menu-principal",
    component: MenuPrincipalComponent,
  },
  {
    path: "menu-principal/detalhamento",
    component: DetalhamentoComponent,
    canActivate: [DetalhamentoGuard],
  },
  {
    path: "**",
    redirectTo: "/menu-principal"
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
