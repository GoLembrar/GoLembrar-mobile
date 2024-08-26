import {Component, Input} from '@angular/core';
import {IonButton} from "@ionic/angular/standalone";

@Component({
  selector: 'go-lembrar-button',
  standalone: true,
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  imports: [
    IonButton
  ]
})
export class ButtonComponent {

  @Input() public nome: string;
  @Input() public corBackground: 'azul-claro';

  constructor() {
    this.nome = '';
    this.corBackground = 'azul-claro';
  }

}
