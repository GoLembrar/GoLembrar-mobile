import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {IonCol, IonContent, IonIcon, IonLabel, IonPopover, IonRow} from "@ionic/angular/standalone";
import {NgOptimizedImage} from "@angular/common";
import {AssetsUtil} from "../../../util/AssetsUtil";
import {addIcons} from "ionicons";
import {ellipsisVertical} from "ionicons/icons";
import {IdsUtil} from "../../../util/IdsUtil";
import {StringsUtil} from "../../../util/StringsUtil";

@Component({
  selector: 'go-lembrar-item-contato',
  standalone: true,
  templateUrl: './item-contato.component.html',
  styleUrls: ['./item-contato.component.scss'],
  imports: [
    IonRow,
    IonCol,
    NgOptimizedImage,
    IonLabel,
    IonIcon,
    IonPopover,
    IonContent
  ]
})
export class ItemContatoComponent {

  @ViewChild('idMenuContextoItemContato') public menuContexto: IonPopover

  public assetUtil = AssetsUtil;
  public stringsUtil = StringsUtil;
  public idsUtil = IdsUtil;

  @Input() public contato: TContato;
  @Input() public canais: TCanais;

  @Output() public editarEventEmitter: EventEmitter<TContato> = new EventEmitter<TContato>();
  @Output() public exluirEventEmitter: EventEmitter<TContato> = new EventEmitter<TContato>();

  public isOpenMenuContexto: boolean;

  constructor() {
    addIcons({ ellipsisVertical });
    this.contato = {} as TContato;
    this.canais = {} as TCanais;
    this.menuContexto = {} as IonPopover;
    this.isOpenMenuContexto = false;
  }

  /**
   * Emite a ação de editar um contato.
   *
   * @author Daniel Silva Marcelino
   */
  public editar(): void {
    this.editarEventEmitter.emit(this.contato);
    this.menuContexto.dismiss().then((): void => {});
  }

  /**
   * Emite a ação de excluir um contato.
   *
   * @author Daniel Silva Marcelino
   */
  public excluir(): void {
    this.exluirEventEmitter.emit(this.contato);
    this.menuContexto.dismiss().then((): void => {});
  }

}

export type TContato = {
  id: number | string,
  foto: string,
  nome: string,
}
export type TCanais = {
  email: boolean,
  whatsapp: boolean,
  telegram: boolean
}
