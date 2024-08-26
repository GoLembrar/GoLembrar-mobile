import {Component, Input} from '@angular/core';
import {IonCol, IonHeader, IonLabel, IonRow, IonTitle, IonToolbar} from "@ionic/angular/standalone";
import {AssetsUtil} from "../../../util/AssetsUtil";
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'go-lembrar-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [
    IonHeader,
    IonTitle,
    IonToolbar,
    IonCol,
    IonRow,
    NgOptimizedImage,
    IonLabel
  ]
})
export class HeaderComponent {

  public assetsUtil = AssetsUtil;

  @Input() public nomeUsuario: string;

  constructor() {
    this.nomeUsuario = 'Nome do guri';
  }

}
