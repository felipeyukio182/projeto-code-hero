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
    document.body.clientWidth < 768 ? this.distancia = 1 : this.distancia = 2

    // Adicionando evento 'resize' para detectar mudanças no tamanho da tela
    // e alterar a quantidade de botoes mostrados na paginação
    window.addEventListener('resize', () => {
      const largura = document.body.clientWidth
      if(largura < 768) { // 784
        this.distancia = 1
        this.menorPagina = this.calcularMenorPagina(this.pagina)
        this.maiorPagina = this.calcularMaiorPagina(this.menorPagina)
        this.montarArrayPaginas()
      } else {
        this.distancia = 2
        this.menorPagina = this.calcularMenorPagina(this.pagina)
        this.maiorPagina = this.calcularMaiorPagina(this.menorPagina)
        this.montarArrayPaginas()
      }
    })

    this.arrayPaginas = []
    this.qtdePaginas = Math.ceil(this.tamanhoLista/this.itensPorPagina)
    this.montarArrayPaginas()
 
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes)
    if(changes['tamanhoLista']){
      this.calcularQtdePaginas()
      this.menorPagina = this.calcularMenorPagina(1)
      this.maiorPagina = this.calcularMaiorPagina(this.menorPagina) 
      this.montarArrayPaginas()
    }
    if(changes['pagina']) {
      this.menorPagina = this.calcularMenorPagina(changes['pagina'].currentValue)
      this.maiorPagina = this.calcularMaiorPagina(this.menorPagina)
      this.montarArrayPaginas()
    }
  }

  ///////////////////////////////////////////////////////////////////////////////////
  // Mudando de paginação
  selecionarPagina(pagina: number) {
    if(pagina == this.pagina) {
      return
    }
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

  irParaPrimeiraPagina() {
    this.pagina = 1
    this.menorPagina = this.calcularMenorPagina(this.pagina)
    this.maiorPagina = this.calcularMaiorPagina(this.menorPagina)
    this.montarArrayPaginas()
    console.log(this.pagina, this.menorPagina, this.maiorPagina, this.arrayPaginas)
    this.paginaChange.emit(this.pagina)
  }

  irParaUltimaPagina() {
    this.pagina = this.qtdePaginas
    this.menorPagina = this.calcularMenorPagina(this.pagina)
    this.maiorPagina = this.calcularMaiorPagina(this.menorPagina)
    this.montarArrayPaginas()
    console.log(this.pagina, this.menorPagina, this.maiorPagina, this.arrayPaginas)
    this.paginaChange.emit(this.pagina)
  }

  ///////////////////////////////////////////////////////////////////////////////////
  // Utils
  calcularMenorPagina(pagAtual: number) {
    const menorPag = pagAtual - this.distancia
    return menorPag > 1 ? menorPag : 1
  }
  calcularMaiorPagina(menorPag: number) {
    const maior = menorPag + (2 * this.distancia)
    return maior < this.qtdePaginas ? maior : this.qtdePaginas
  }

  calcularQtdePaginas() {
    this.qtdePaginas = Math.ceil(this.tamanhoLista/this.itensPorPagina)
  }
  montarArrayPaginas() {
    this.arrayPaginas = []
    for(let i = this.menorPagina; i < this.maiorPagina + 1; i++) {
      this.arrayPaginas.push(i)
    }
    console.log(this.qtdePaginas)
  }

  esconderSetasPaginacao(tipoSeta: "primeira"|"anterior"|"proxima"|"ultima") {
    const pag = this.pagina
    const qtdePag = this.qtdePaginas
    if((pag <= 2 && tipoSeta == "primeira") || 
       (pag == 1 && tipoSeta == "anterior") || 
       (pag == qtdePag && tipoSeta == "proxima") || 
       (pag >= qtdePag - 1 && tipoSeta == "ultima")) {
      return "setas setas-esconder"
    } else {
      return "setas"
    }
  }

}
