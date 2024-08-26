import {Component, EventEmitter, Input, Output} from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {NgOptimizedImage} from "@angular/common";
import {AssetsUtil} from "../../../util/AssetsUtil";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'go-lembrar-pesquisar',
  standalone: true,
  templateUrl: './pesquisar.component.html',
  styleUrls: ['./pesquisar.component.scss'],
  imports: [
    IonicModule,
    NgOptimizedImage,
    FormsModule
  ]
})
export class PesquisarComponent {

  public assetsUtil = AssetsUtil;

  @Input() public placeholder?: string;

  @Output() public pesquisarEventEmitter: EventEmitter<string> = new EventEmitter<string>();

  public pesquisa: string;

  constructor() {
    this.placeholder = 'Pesquisar';
    this.pesquisa = '';
  }

  /**
   * Emite a pesquisa informada ou uma string vazia.
   *
   * @author Daniel Silva Marcelino
   */
  public emitirPesquisa(): void {
    if (this.pesquisa.trim().length >= 3) {
      this.pesquisarEventEmitter.emit(this.pesquisa);
    } else {
      this.pesquisarEventEmitter.emit('');
    }
  }
}
