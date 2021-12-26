import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  public mensagem: string = ""
  public estilo: "sucesso"|"erro"|"" = ""
  public mostrarToast: boolean = false
  public duracao: number = 4000 // 4s

  constructor() { }

  erroAoRequisitarServidorMarvel(): void {
    this.mostrarMensagem(`Erro ao requisitar servidor da Marvel... Favor atualize a pagina e tente novamente`, "erro", this.duracao)
  }

  async mostrarMensagem(msg: string, estilo: "sucesso"|"erro"|"", duracao: number): Promise<void> {
    this.mensagem = msg
    this.estilo = estilo
    this.mostrarToast = true

    await new Promise((res: any) => 
      setTimeout(() => {
        this.mostrarToast = false
        res("ok")
      }, duracao)
    ).then(() => {
      // Precisei adicionar outro timeout, para dar tempo da transição do toast terminar (fadeout), sem que o toast fique sem a 'mensagem'
      const duracaoDoTransitionDoToast = 500
      setTimeout(() => {
        this.mensagem = ""
        this.estilo = ""
      }, duracaoDoTransitionDoToast)
    })

  }
}
