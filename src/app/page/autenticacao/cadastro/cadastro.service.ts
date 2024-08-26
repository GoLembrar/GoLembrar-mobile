import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {lastValueFrom} from "rxjs";
import {UserModel} from "../../../../model/UserModel";
import {environment} from "../../../../environments/environment";
import {TDadosCadastro} from "./types/TDadosCadastro";

@Injectable({
  providedIn: 'root'
})
export class CadastroService {

  constructor(private httpClient: HttpClient) { }

  /**
   * Cadastra um novo usuário.
   *
   * @param userModel
   *    Objeto com os dados para registro.
   *
   * @author Daniel Silva Marcelino
   */
  public postCadstrar(userModel: UserModel): Promise<void> {
    const parametros: TDadosCadastro = {
      name: <string>userModel.name,
      email: <string>userModel.email,
      password: <string>userModel.password,
    };

    return lastValueFrom<void>(this.httpClient.post<void>(environment.principal + environment.user.post, parametros));
  }

}
