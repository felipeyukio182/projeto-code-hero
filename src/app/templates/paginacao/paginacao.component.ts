import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-paginacao',
  templateUrl: './paginacao.component.html',
  styleUrls: ['./paginacao.component.css']
})
export class PaginacaoComponent implements OnInit, OnChanges {

  @Input() pagina: number = 1
  @Input() itensPorPagina: number = 10
  @Input() tamanhoLista: number = 100
  @Input() distancia: number = 2 // Aqui posso setar para 1, quando necessário (mobile)

  @Output() paginaChange: EventEmitter<number> = new EventEmitter<number>()

  public qtdePaginas: number = 0
  public arrayPaginas: Array<number> = []
  public menorPagina: number = 1 // Por padrão
  public maiorPagina: number = this.menorPagina + (2 * this.distancia) // Por padrão

  constructor() {
    
  }

  ngOnInit(): void {
    // console.log(this.tamanhoLista)
    this.arrayPaginas = []
    this.qtdePaginas = Math.ceil(this.tamanhoLista/this.itensPorPagina)
    this.montarArrayPaginas()
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes)
    if(changes['tamanhoLista']){      
      this.montarArrayPaginas()
    }
  }

  selecionarPagina(pagina: number) {
    this.pagina = pagina
    this.menorPagina = this.calcularMenorPagina(this.pagina)
    this.maiorPagina = this.calcularMaiorPagina(this.menorPagina)
    this.montarArrayPaginas()
    console.log(this.pagina, this.menorPagina, this.maiorPagina, this.arrayPaginas)
    this.paginaChange.emit(this.pagina)
  }

  irParaProximaPagina() {
    if(this.pagina + 1 > this.qtdePaginas) {
      return
    }
    this.pagina++
    this.menorPagina = this.calcularMenorPagina(this.pagina)
    this.maiorPagina = this.calcularMaiorPagina(this.menorPagina)
    this.montarArrayPaginas()
    console.log(this.pagina, this.menorPagina, this.maiorPagina, this.arrayPaginas)
    this.paginaChange.emit(this.pagina)
  }
  
  irParaPaginaAnterior() {
    if(this.pagina - 1 < 1) {
      return
    }
    this.pagina--
    this.menorPagina = this.calcularMenorPagina(this.pagina)
    this.maiorPagina = this.calcularMaiorPagina(this.menorPagina)
    this.montarArrayPaginas()
    console.log(this.pagina, this.menorPagina, this.maiorPagina, this.arrayPaginas)
    this.paginaChange.emit(this.pagina)
  }

  calcularMenorPagina(pagAtual: number) {
    const menorPag = pagAtual - this.distancia
    return menorPag > 1 ? menorPag : 1
  }
  calcularMaiorPagina(menorPag: number) {
    const maior = menorPag + (2 * this.distancia)
    return maior < this.qtdePaginas ? maior : this.qtdePaginas
  }

  montarArrayPaginas() {
    this.arrayPaginas = []
    this.qtdePaginas = Math.ceil(this.tamanhoLista/this.itensPorPagina)
    for(let i = this.menorPagina; i < this.maiorPagina + 1; i++) {
      this.arrayPaginas.push(i)
    }
  }

}