import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detalhamento',
  templateUrl: './detalhamento.component.html',
  styleUrls: ['./detalhamento.component.css']
})
export class DetalhamentoComponent implements OnInit {

  public carregando: boolean = false

  constructor() { }

  ngOnInit(): void {
  }

}
