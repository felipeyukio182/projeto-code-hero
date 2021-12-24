import { Injectable } from '@angular/core';
import { UtilsService } from './utils.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as env from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RequisicaoService {

  private baseUrlMarvel: string = env.environment.baseUrlMarvel
  private apikeyMarvel: string = env.environment.apikeyMarvel
  private privatekeyMarvel: string = env.environment.privatekeyMarvel

  constructor(
    private utils: UtilsService,
    private http: HttpClient
  ) { }

  getMarvel(url: string, query?: any): Observable<any> {
    const ts = this.utils.gerarTimeStamp()
    const apikey = this.apikeyMarvel
    const md5 = this.utils.converterStringParaMd5(ts + this.privatekeyMarvel + this.apikeyMarvel)
    let urlCompleta = `${this.baseUrlMarvel}/${url}?ts=${ts}&apikey=${apikey}&hash=${md5}`

    if(query) {
      const arrNomesQuery = Object.keys(query)
      for(let i in arrNomesQuery) {
        urlCompleta += `&${arrNomesQuery[i]}=${query[arrNomesQuery[i]]}`
      }
    }
    return this.http.get(urlCompleta)
  }

}
