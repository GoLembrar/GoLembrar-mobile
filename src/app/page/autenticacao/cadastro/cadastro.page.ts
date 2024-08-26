import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {
  IonCard,
  IonCardContent,
  IonCol,
  IonContent,
  IonHeader, IonLabel,
  IonRow,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {AssetsUtil} from "../../../../util/AssetsUtil";
import {StringsUtil} from "../../../../util/StringsUtil";
import {InputComponent} from "../../../component/input/input.component";
import {ButtonComponent} from "../../../component/button/button.component";
import {RotasService} from "../../../rotas.service";
import {TFormGroupType} from "../../../../type/TFormGroupType";
import {BasicUtil} from "../../../../util/BasicUtil";
import {ValidateFormUtil} from "../../../../util/ValidateFormUtil";
import {UserModel} from "../../../../model/UserModel";
import {CadastroService} from "./cadastro.service";
import {AlertaUtil} from "../../../../util/AlertaUtil";
import {AlertController, LoadingController} from "@ionic/angular";
import {TFormCadastro} from "./types/TFormCadastro";

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonRow, IonCol, IonCard,
    IonCardContent, IonLabel, InputComponent, ButtonComponent, ReactiveFormsModule],
  providers: [
    {
      provide: CadastroService
    }
  ]
})
export class CadastroPage implements OnInit {

  public assetsUtil = AssetsUtil;
  public stringsUtil = StringsUtil;

  public basicUtil: BasicUtil = new BasicUtil();
  public userModel: UserModel;
  public alertUtil: AlertaUtil;

  //@ts-ignore
  public formGroup: FormGroup;
  public isSubmetido: boolean;
  public formControlName = this.basicUtil.criarObjetoPeloType<TFormCadastro>({
    nome: null,
    email: null,
    senha: null,
    repetirSenha: null
  });

  constructor(private rotasService: RotasService, private cadastroService: CadastroService,
              private alertController: AlertController, private loadingController: LoadingController) {
    this.alertUtil = new AlertaUtil(this.alertController, this.loadingController);
    this.userModel = new UserModel();
    this.isSubmetido = false;
    this.validarFormulario();
  }

  ngOnInit(): void {
  }

  /**
   * Realiza o cadastro de um novo usuário.
   *
   * @author Daniel Silva Marcelino
   */
  public async cadastrar(): Promise<void> {
    this.isSubmetido = true;

    if (this.formGroup.valid) {
      await this.alertUtil.alertaCarregando(this.stringsUtil.aguardeEnquantoRealizamosCadastro);
      this.cadastroService.postCadstrar(this.userModel).then(
        (): void => {
          this.alertUtil.alertaSucesso(this.stringsUtil.cadastroRealizado);
          this.abrirLogin();
        }
      ).finally(
        (): void => {
          this.alertUtil.fecharAlertaCarregando();
        }
      )
    }
  }

  /**
   * Recupera os dados do formulário para o model.
   *
   * @author Daniel Silva Marcelino
   */
  public recuperarDadosFormulario(): void {
    this.userModel.name = this.formGroup.controls[this.formControlName.nome].value;
    this.userModel.email = this.formGroup.controls[this.formControlName.email].value;
    this.userModel.password = this.formGroup.controls[this.formControlName.repetirSenha].value;
  }

  /**
   * Volta a tela de login.
   *
   * @author Daniel Silva Marcelino
   */
  public abrirLogin(): void {
    this.rotasService.voltar();
  }

  /**
   * Valida o formulário.
   *
   * @private
   *
   * @author Daniel Silva Marcelino
   */
  private validarFormulario(): void {
    this.formGroup = new FormGroup<TFormGroupType<TFormCadastro>>({
      nome: new FormControl(null, [Validators.required, ValidateFormUtil.nomeCompleto, Validators.maxLength(100)]),
      email: new FormControl(null, [Validators.required, Validators.email, Validators.maxLength(100)]),
      senha: new FormControl(null, [Validators.required, Validators.maxLength(20),
        Validators.minLength(6), ValidateFormUtil.validarMaiuscula(1)]),
      repetirSenha: new FormControl(null, [Validators.required, Validators.maxLength(20),
        Validators.minLength(6), ValidateFormUtil.validarMaiuscula(1)]),
    }, {validators: ValidateFormUtil.compararSenhas(this.formControlName.senha, this.formControlName.repetirSenha)});
  }
}
