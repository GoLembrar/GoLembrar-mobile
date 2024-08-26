import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserModel} from "../../../../model/UserModel";
import {lastValueFrom} from "rxjs";
import {environment} from "../../../../environments/environment";
import {TLogin} from "./types/TLogin";
import {TDadosCadastro} from "./types/TDadosCadastro";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient) { }

  /**
   * Login do usuário.
   *
   * @param userModel
   *    Objeto com os dados para login.
   *
   * @author Daniel Silva Marcelino
   */
  public postLogin(userModel: UserModel): Promise<TLogin> {
    const parametros: TDadosCadastro = {
      email: <string>userModel.email,
      password: <string>userModel.password,
    };

    return lastValueFrom<TLogin>(this.httpClient.post<TLogin>(environment.principal + environment.auth, parametros));
  }

}
