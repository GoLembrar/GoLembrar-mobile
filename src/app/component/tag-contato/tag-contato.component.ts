import {Component, Input} from '@angular/core';
import {IonCard, IonCardContent, IonLabel} from "@ionic/angular/standalone";
import {TStringsUtil} from "../../../type/TStringsUtil";
import {StringsUtil} from "../../../util/StringsUtil";
import {NgOptimizedImage} from "@angular/common";
import {TAssetsUtil} from "../../../type/TAssetsUtil";
import {AssetsUtil} from "../../../util/AssetsUtil";

@Component({
  selector: 'go-lembrar-tag-contato',
  standalone: true,
  templateUrl: './tag-contato.component.html',
  styleUrls: ['./tag-contato.component.scss'],
  imports: [
    IonCard,
    IonCardContent,
    IonLabel,
    NgOptimizedImage
  ]
})
export class TagContatoComponent {

  @Input() public contact: string;

  public stringsUtil: TStringsUtil;
  public assetsUtil: TAssetsUtil;

  constructor() {
    this.initialize();
  }

  /**
   * Initialize the variables and objects necessary.
   *
   * @private
   *
   * @author Daniel Silva Marcelino
   */
  private initialize(): void {
    this.stringsUtil = StringsUtil;
    this.assetsUtil = AssetsUtil;
    this.contact = 'Luma Melo';
  }

}
