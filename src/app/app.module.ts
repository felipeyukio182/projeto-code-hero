import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MenuPrincipalComponent } from './components/menu-principal/menu-principal.component';
import { TemplatesModule } from './templates/templates.module';
import { DetalhamentoComponent } from './components/detalhamento/detalhamento.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuPrincipalComponent,
    DetalhamentoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TemplatesModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
