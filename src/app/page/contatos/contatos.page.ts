import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {IonCol, IonContent, IonHeader, IonLabel, IonRow, IonTitle, IonToolbar} from '@ionic/angular/standalone';
import {HeaderComponent} from "../../component/header/header.component";
import {FiltrarComponent} from "../../component/filtrar/filtrar.component";
import {ItemContatoComponent, TCanais, TContato} from "../../component/item-contato/item-contato.component";
import {PesquisarComponent} from "../../component/pesquisar/pesquisar.component";
import {StringsUtil} from "../../../util/StringsUtil";
import {AssetsUtil} from "../../../util/AssetsUtil";
import {FabButtonComponent} from "../../component/fab-button/fab-button.component";

@Component({
  selector: 'app-contatos',
  templateUrl: './contatos.page.html',
  styleUrls: ['./contatos.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, HeaderComponent, FiltrarComponent, IonCol, IonLabel, IonRow, ItemContatoComponent, PesquisarComponent, FabButtonComponent]
})
export class ContatosPage{

  public stringsUtil = StringsUtil;
  public assetsUtil = AssetsUtil;

  public listContatos: TContato[];
  public canais: TCanais;

  constructor() {
    this.listContatos = [
      {
        id: 'daniel',
        foto: this.assetsUtil.usergSVG,
        nome: 'Programmer Hacker'
      },
      {
        id: 'adrew',
        foto: this.assetsUtil.usergSVG,
        nome: 'Andrew'
      },
      {
        id: 'jonathas',
        foto: this.assetsUtil.usergSVG,
        nome: 'Jonathas'
      },
      {
        id: 'vanessa',
        foto: this.assetsUtil.usergSVG,
        nome: 'Vanessa Ramos'
      },
      {
        id: 'fernanda',
        foto: this.assetsUtil.usergSVG,
        nome: 'Fernanda'
      }
    ];
    this.canais = {
      telegram: true,
      whatsapp: true,
      email: true
    }
  }

}
