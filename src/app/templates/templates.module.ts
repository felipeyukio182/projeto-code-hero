import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginacaoComponent } from './paginacao/paginacao.component';
import { CarregandoComponent } from './carregando/carregando.component';



@NgModule({
  declarations: [
    PaginacaoComponent,
    CarregandoComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PaginacaoComponent,
    CarregandoComponent
  ]
})
export class TemplatesModule { }
