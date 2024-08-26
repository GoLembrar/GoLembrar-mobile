import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {IonInput} from "@ionic/angular/standalone";
import {AssetsUtil} from "../../../util/AssetsUtil";
import {ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'go-lembrar-input',
  standalone: true,
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  imports: [
    IonInput,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ]
})
export class InputComponent implements OnInit, ControlValueAccessor{

  public assetsUtil = AssetsUtil;

  @Input() public placeholder: string;
  @Input() public icone?: string;
  @Input() public isPassword?: boolean;

  public value: string;
  //@ts-ignore
  private changed: (value: string) => void;
  //@ts-ignore
  private touched: () => void;
  public isDisabled: boolean;

  public isMostrarPassword: boolean;
  public tipo: string;

  constructor() {
    this.placeholder = '';
    this.value = '';
    this.isDisabled = false;
    this.isMostrarPassword = false;
    this.isPassword = false;
    this.tipo = 'text';
  }

  ngOnInit(): void {
    if (this.isPassword) {
      this.tipo = 'password';
    } else {
      this.tipo = 'text';
    }
  }

  /**
   * Mostrar/esconder o password.
   *
   * @author Daniel Silva Marcelino
   */
  public mostrarEsconderPassword(): void {
    if (!this.isMostrarPassword) {
      this.isMostrarPassword = !this.isMostrarPassword;
      this.tipo = 'text';
    } else {
      this.isMostrarPassword = !this.isMostrarPassword;
      this.tipo = 'password';
    }
  }

  /**
   * Recupera o conteúdo e atualiza o registerOnChange do ControlValueAccessor;
   *
   * @param event
   *    Objeto do evento input.
   *
   * @author Daniel Silva Marcelino
   */
  public recuperarConteudo(event: Event): void {
    const conteudo: string = (<HTMLInputElement>event.target).value;
    this.changed(conteudo);

  }

  public registerOnChange(changed: any): void {
    this.changed = changed;
  }

  public registerOnTouched(touched: any): void {
    this.touched = touched;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  public writeValue(value: any): void {
    this.value = value;
  }
}
