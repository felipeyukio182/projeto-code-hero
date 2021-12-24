import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-padrao',
  templateUrl: './header-padrao.component.html',
  styleUrls: ['./header-padrao.component.css']
})
export class HeaderPadraoComponent implements OnInit {

  public nomeDoCandidato: string = "Felipe Yukio Fupunaga"

  constructor() { }

  ngOnInit(): void {
  }

}
