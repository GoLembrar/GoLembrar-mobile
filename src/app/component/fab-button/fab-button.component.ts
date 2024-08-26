import { Component } from '@angular/core';
import {IonFab, IonFabButton, IonFabList, IonLabel} from "@ionic/angular/standalone";
import {AssetsUtil} from "../../../util/AssetsUtil";
import {NgOptimizedImage} from "@angular/common";
import {StringsUtil} from "../../../util/StringsUtil";

@Component({
  selector: 'go-lembrar-fab-button',
  standalone: true,
  templateUrl: './fab-button.component.html',
  styleUrls: ['./fab-button.component.scss'],
  imports: [
    IonFab,
    IonFabButton,
    NgOptimizedImage,
    IonFabList,
    IonLabel
  ]
})
export class FabButtonComponent {

  public stringsUtil = StringsUtil;
  public assetsUtil = AssetsUtil;

  constructor() { }

}
