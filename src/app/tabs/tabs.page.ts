import { Component } from '@angular/core';
import {
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
  IonHeader,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { triangle, ellipse, square } from 'ionicons/icons';
import {StringsUtil} from "../../util/StringsUtil";
import {AssetsUtil} from "../../util/AssetsUtil";
import {NgOptimizedImage} from "@angular/common";
import {RotasService} from "../rotas.service";
import {RotasUtil} from "../../util/RotasUtil";

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  standalone: true,
  imports: [IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, NgOptimizedImage, IonHeader, IonTitle, IonToolbar]
})
export class TabsPage {

  public stringsUtil = StringsUtil;
  public assetsUtil = AssetsUtil;
  public rotasUtil = RotasUtil;

  public tab: number;

  constructor(private rotasService: RotasService) {
    addIcons({ triangle, ellipse, square });
    this.tab = 1;
  }

  public abrirTab(tab: number): void {
    this.tab = tab;
    if (tab === 0) {
      this.rotasService.inicio();
    } else if (tab === 1) {
      this.rotasService.contatos();
    }
  }
}
