import { Injectable } from '@angular/core';
import { Md5 } from 'ts-md5';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  converterStringParaMd5(texto: string): string {
    return Md5.hashStr(texto)
  }

  gerarTimeStamp(): number {
    const dataAtual = new Date()
    return Date.parse(dataAtual.toString())
  }
}
