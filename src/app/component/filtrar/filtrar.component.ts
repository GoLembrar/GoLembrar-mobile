import {Component, EventEmitter, Input, Output} from '@angular/core';
import {StringsUtil} from "../../../util/StringsUtil";
import {AssetsUtil} from "../../../util/AssetsUtil";
import {NgOptimizedImage} from "@angular/common";
import {IonCol, IonIcon, IonInput, IonRow, IonSelect, IonSelectOption} from "@ionic/angular/standalone";
import { addIcons } from "ionicons";
import { chevronDownOutline } from "ionicons/icons";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'go-lembrar-filtrar',
  standalone: true,
  templateUrl: './filtrar.component.html',
  styleUrls: ['./filtrar.component.scss'],
  imports: [
    NgOptimizedImage,
    IonIcon,
    IonInput,
    IonSelect,
    IonSelectOption,
    IonRow,
    IonCol,
    FormsModule
  ]
})
export class FiltrarComponent {

  public stringUtil = StringsUtil;
  public assetUtil = AssetsUtil;

  @Input() public placeholder?: string;
  @Input() public listItens: TListItem[];

  @Output() public itemSelecionadoEventEmitter: EventEmitter<TListItem> = new EventEmitter<TListItem>();

  public itemSelecionado: string | number = '';

  constructor() {
    this.listItens = [];
    addIcons({ chevronDownOutline });
    this.placeholder = this.stringUtil.filtrar;
  }

  /**
   * Emite o item selecionado.
   *
   * @author Daniel Silva Marcelino
   */
  public emitirSelecao(): void {
    this.itemSelecionadoEventEmitter.emit(this.listItens.find((value: TListItem): boolean => value.identificador === this.itemSelecionado));
  }

}
export type TListItem = {
  identificador: string | number,
  descricao: string | number
}
