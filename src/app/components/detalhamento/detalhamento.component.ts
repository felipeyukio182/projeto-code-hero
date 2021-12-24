import { Component, OnInit, ViewChild } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { RequisicaoService } from 'src/app/services/requisicao.service';

@Component({
  selector: 'app-detalhamento',
  templateUrl: './detalhamento.component.html',
  styleUrls: ['./detalhamento.component.css']
})
export class DetalhamentoComponent implements OnInit {

  public carregando: boolean = false

  public alturaPadraoListItem: number = 18 // Altura padrao em px do li das ul

  public personagem: any = null
  public listaComics: Array<any> = []
  public listaEvents: Array<any> = []
  public listaSeries: Array<any> = []
  public listaStories: Array<any> = []

  constructor(
    private requisicaoService: RequisicaoService
  ) { }
  
  ngOnInit(): void {
    this.personagem = JSON.parse(localStorage.getItem("personagem")!)

    this.carregando = true

    // Usando forkJoin para que as requisições resolvam ao mesmo tempo, 
    // evitando conflitos com o 'carregando'
    forkJoin([
      this.buscarComics(),
      this.buscarEvents(),
      this.buscarSeries(),
      this.buscarStories()
    ]).subscribe({
      next: (retorno: Array<any>) => {
        console.log(retorno)
        this.listaComics = retorno[0].data.results
        this.listaEvents = retorno[1].data.results
        this.listaSeries = retorno[2].data.results
        this.listaStories = retorno[3].data.results
        this.carregando = false
      },
      error: (err: any) => {
        console.log(err)
        this.carregando = false
      }
    })
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////
  // Observables das requisições GET
  buscarComics(): Observable<any> {
    const query = {
      limit: this.personagem.comics.available < 100 ? this.personagem.comics.available : 100
    }
    return this.requisicaoService.getMarvel(`v1/public/characters/${this.personagem.id}/comics`, query)
  }
  buscarEvents(): Observable<any> {
    const query = {
      limit: this.personagem.events.available < 100 ? this.personagem.events.available : 100
    }
    return this.requisicaoService.getMarvel(`v1/public/characters/${this.personagem.id}/events`, query)
  }
  buscarSeries(): Observable<any> {
    const query = {
      limit: this.personagem.series.available < 100 ? this.personagem.series.available : 100
    }
    return this.requisicaoService.getMarvel(`v1/public/characters/${this.personagem.id}/series`, query)
  }
  buscarStories(): Observable<any> {
    const query = {
      limit: this.personagem.stories.available < 100 ? this.personagem.stories.available : 100
    }
    return this.requisicaoService.getMarvel(`v1/public/characters/${this.personagem.id}/stories`, query)
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////
  // Lista responsiva
  mostrarLista(lista: HTMLElement, icone: HTMLElement, tamanhoLista: number = 0) {
    if(parseInt(lista.style.maxHeight.replace("px", "")) > 0) {
      icone.style.transform = "rotateZ(0deg)"
      // icone.style.transform = "rotateX(0deg)"
      lista.style.maxHeight = 0 + 'px'
    } else {
      icone.style.transform = "rotateZ(180deg)"
      // icone.style.transform = "rotateX(180deg)"
      lista.style.maxHeight = (this.alturaPadraoListItem * tamanhoLista) + 'px'
    }
  }

}
