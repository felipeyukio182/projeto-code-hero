import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { concatMap, debounceTime, Observable, Subscription } from 'rxjs';
import { RequisicaoService } from 'src/app/services/requisicao.service';

@Component({
  selector: 'app-menu-principal',
  templateUrl: './menu-principal.component.html',
  styleUrls: ['./menu-principal.component.css']
})
export class MenuPrincipalComponent implements OnInit {
  
  public carregando: boolean = false
  public pagina: number = 1
  public totalListaPersonagens: number = 0

  public nomeDoPersonagemPesquisa: FormControl = new FormControl("")
  public listaPersonagens: Array<any> = []

  private listaPersonagensObservable: Subscription|null = null

  constructor(
    private requisicaoService: RequisicaoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Limpar storage, caso tenha 'personagem'
    localStorage.removeItem("personagem")

    this.buscarListaPersonagens()

    // Observable para monitorar mudanças no input de pesquisa
    this.nomeDoPersonagemPesquisa.valueChanges.pipe(
      debounceTime(900),
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
    // Caso a requisição não tenha finalizado e o usuario realizar uma outra,
    // eu cancelo a requisição com o 'unsubscribe' (para evitar sobrecarga de requisições)
    if(this.listaPersonagensObservable) {
      this.listaPersonagensObservable.unsubscribe()
    }
    this.listaPersonagensObservable = this.buscarListaPersonagensObservable().subscribe({
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

  mostrarDetalhamentoPersonagem(personagem: any): void {
    localStorage.setItem("personagem", JSON.stringify(personagem))
    this.router.navigate(["menu-principal/detalhamento"])
  }

}
