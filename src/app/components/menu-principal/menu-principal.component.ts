import { Component, OnInit } from '@angular/core';
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
  public listaPersonagens: Array<any> = []

  constructor(private requisicaoService: RequisicaoService) { }

  ngOnInit(): void {
    this.buscarListaPersonagens()
  }

  buscarListaPersonagens() {
    const query = {
      limit: 10,
      offset: (this.pagina - 1) * 10
    }
    this.requisicaoService.getMarvel("v1/public/characters", query).subscribe({
      next: (retorno: any) => {
        console.log(retorno)
        this.totalListaPersonagens = retorno.data.total
        this.listaPersonagens = retorno.data.results
      }
    })
  }

}
