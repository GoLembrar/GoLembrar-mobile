import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {
  IonCard,
  IonCardContent, IonCol,
  IonContent,
  IonHeader,
  IonImg, IonLabel,
  IonRow,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {LoginService} from "./login.service";
import {AssetsUtil} from "../../../../util/AssetsUtil";
import {StringsUtil} from "../../../../util/StringsUtil";
import {InputComponent} from "../../../component/input/input.component";
import {ButtonComponent} from "../../../component/button/button.component";
import {RotasService} from "../../../rotas.service";
import {TFormGroupType} from "../../../../type/TFormGroupType";
import {ValidateFormUtil} from "../../../../util/ValidateFormUtil";
import {BasicUtil} from "../../../../util/BasicUtil";
import {UserModel} from "../../../../model/UserModel";
import {AlertaUtil} from "../../../../util/AlertaUtil";
import {AlertController, LoadingController} from "@ionic/angular";
import {Preferences} from "@capacitor/preferences";
import {TFormLogin} from "./types/TFormLogin";
import {TLogin} from "./types/TLogin";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonImg, IonCard,
    IonCardContent, IonRow, IonCol, IonLabel, InputComponent, ButtonComponent, ReactiveFormsModule],
  providers: [
    {
      provide: LoginService
    }
  ]
})
export class LoginPage implements OnInit {

  public assetsUtil = AssetsUtil;
  public stringsUtil = StringsUtil;
  public basicUtil: BasicUtil = new BasicUtil();
  public alertaUtil: AlertaUtil;

  //@ts-ignore
  public formGroup: FormGroup;
  public formControlName = this.basicUtil.criarObjetoPeloType<TFormLogin>({
    email: null,
    senha: null,
  });
  public isSubmetido: boolean;
  public userModel: UserModel;

  constructor(private rotasService: RotasService, private alertController: AlertController,
              private loadingController: LoadingController, private loginService: LoginService) {
    this.verificarLogin();
    this.alertaUtil = new AlertaUtil(this.alertController, this.loadingController);
    this.userModel = new UserModel();
    this.isSubmetido = false;
    this.validarFormulario();
  }

  ngOnInit(): void {
  }

  /**
   * Realiza o login do usuário.
   *
   * @author Daniel Silva Marcelino
   */
  public async login(): Promise<void> {
    this.isSubmetido = true;

    if (this.formGroup.valid) {
      await this.alertaUtil.alertaCarregando();

      this.loginService.postLogin(this.userModel).then(
        (value: TLogin): void => {
          Preferences.set({key: 'Bearer', value: value.token});
          this.rotasService.contatos();
        }
      ).finally(
        (): void => this.alertaUtil.fecharAlertaCarregando()
      );
    }
  }

  /**
   * Recupera os dado so formulário.
   *
   * @author Daniel Silva Marcelino
   */
  public recuperarDadosFormulario(): void {
    this.userModel.email = this.formGroup.controls[this.formControlName.email].value;
    this.userModel.password = this.formGroup.controls[this.formControlName.senha].value;
  }

  /**
   * Abre a tela de login.
   *
   * @author Daniel Silva Marcelino
   */
  public abrirCadastro(): void {
    this.rotasService.cadastro();
  }

  /**
   * Verifica se o usuário já está logado.
   *
   * @private
   *
   * @author Daniel Silva Marcelino
   */
  private verificarLogin(): void {
    this.basicUtil.isLogado().then(
      (value: boolean): void => {
        if (value) {
          this.rotasService.contatos();
        }
      }
    );
  }

  /**
   * Valida o formulário.
   *
   * @private
   *
   * @author Daniel Silva Marcelino
   */
  private validarFormulario(): void {
    this.formGroup = new FormGroup<TFormGroupType<TFormLogin>>({
      email: new FormControl(null, [Validators.required, Validators.email,
        Validators.maxLength(100)]),
      senha: new FormControl(null, [Validators.required, Validators.maxLength(20),
        Validators.minLength(6), ValidateFormUtil.validarMaiuscula(1)]),
    });
  }
}
