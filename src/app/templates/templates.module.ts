import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginacaoComponent } from './paginacao/paginacao.component';
import { CarregandoComponent } from './carregando/carregando.component';
import { HeaderPadraoComponent } from './header-padrao/header-padrao.component';



@NgModule({
  declarations: [
    PaginacaoComponent,
    CarregandoComponent,
    HeaderPadraoComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PaginacaoComponent,
    CarregandoComponent,
    HeaderPadraoComponent
  ]
})
export class TemplatesModule { }
