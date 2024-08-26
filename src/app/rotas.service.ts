import { Injectable } from '@angular/core';
import {NavController} from "@ionic/angular";
import {RotasUtil} from "../util/RotasUtil";

@Injectable({
  providedIn: 'root'
})
export class RotasService {

  rotaUtil = RotasUtil;

  constructor(private navController: NavController) { }

  /**
   * Volta uma tela.
   *
   * @author Daniel Silva Marcelino
   */
  public voltar(): void {
    this.navController.back();
  }

  /**
   * Abre a tela de contatos.
   *
   * @author Daniel Silva Marcelino
   */
  public contatos(): void {
    this.navController.navigateForward(this.rotaUtil.tabs.path + '/' + this.rotaUtil.tabs.children.contatos).then((): void => {});
  }

  /**
   * Abre a tela de início.
   *
   * @author Daniel Silva Marcelino
   */
  public inicio(): void {
    this.navController.navigateForward(this.rotaUtil.tabs.path + '/' + this.rotaUtil.tabs.children.inicio).then((): void => {});
  }

  /**
   * Abre a tela de login.
   *
   * @author Daniel Silva Marcelino
   */
  public login(): void {
    this.navController.navigateRoot(this.rotaUtil.login).then((): void => {});
  }

  /**
   * Abre a tela de cadastro.
   *
   * @author Daniel Silva Marcelino
   */
  public cadastro(): void {
    this.navController.navigateForward(this.rotaUtil.cadastro).then((): void => {});
  }
}
