import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { concatMap, debounceTime, Observable } from 'rxjs';
import { RequisicaoService } from 'src/app/services/requisicao.service';

@Component({
  selector: 'app-menu-principal',
  templateUrl: './menu-principal.component.html',
  styleUrls: ['./menu-principal.component.css']
})
export class MenuPrincipalComponent implements OnInit {

  public nomeDoCandidato: string = "Felipe Yukio Fupunaga"
  
  public carregando: boolean = false
  public pagina: number = 1
  public totalListaPersonagens: number = 0

  // public nomeDoPersonagemPesquisa: string|null = ""
  public nomeDoPersonagemPesquisa: FormControl = new FormControl("")
  public listaPersonagens: Array<any> = []

  constructor(private requisicaoService: RequisicaoService) { }

  ngOnInit(): void {
    this.buscarListaPersonagens()
    

    this.nomeDoPersonagemPesquisa.valueChanges.pipe(
      debounceTime(500),
      concatMap(() => {
        this.pagina = 1
        return this.buscarListaPersonagensObservable()
      })
    ).subscribe({
      next: (retorno: any) => {
        console.log(retorno)
        this.totalListaPersonagens = retorno.data.total
        this.listaPersonagens = retorno.data.results
        this.carregando = false
      },
      error: (err: any) => {
        console.log(err)
        this.carregando = false
      }
    })
  }

  buscarListaPersonagens(): void {
    this.buscarListaPersonagensObservable().subscribe({
      next: (retorno: any) => {
        console.log(retorno)
        this.totalListaPersonagens = retorno.data.total
        this.listaPersonagens = retorno.data.results
        this.carregando = false
      },
      error: (err: any) => {
        console.log(err)
        this.carregando = false
      }
    })
  }

  buscarListaPersonagensObservable(): Observable<any> {
    this.carregando = true
    const query = this.parametrosBuscarListaPersonagens(this.nomeDoPersonagemPesquisa.value)
    return this.requisicaoService.getMarvel("v1/public/characters", query)
  }

  parametrosBuscarListaPersonagens(nameStartsWith: string|null = null): any {
    let query: any = {
      limit: 10,
      offset: (this.pagina - 1) * 10
    }
    nameStartsWith ? query.nameStartsWith = nameStartsWith : ""
    return query
  }

}
