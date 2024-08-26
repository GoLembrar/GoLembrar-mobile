import {Component, Input, OnInit} from '@angular/core';
import {TStatus} from "./types/TStatus";
import {IonCard, IonCardContent, IonLabel} from "@ionic/angular/standalone";
import {NgOptimizedImage} from "@angular/common";
import {AssetsUtil} from "../../../util/AssetsUtil";
import {TAssetsUtil} from "../../../type/TAssetsUtil";
import {TStringsUtil} from "../../../type/TStringsUtil";
import {StringsUtil} from "../../../util/StringsUtil";

@Component({
  selector: 'go-lembrar-tag-status',
  standalone: true,
  templateUrl: './tag-status.component.html',
  styleUrls: ['./tag-status.component.scss'],
  imports: [
    IonCardContent,
    IonCard,
    NgOptimizedImage,
    IonLabel
  ]
})
export class TagStatusComponent  implements OnInit {

  @Input() public status: TStatus;

  public assetsUtil: TAssetsUtil;
  public stringsUtil: TStringsUtil;

  constructor() {
    this.initialize();
  }

  ngOnInit(): void {
    this.status.isPending = true;
  }

  /**
   * Initialize the variables and objects necessary.
   *
   * @private
   *
   * @author Daniel Silva Marcelino
   */
  private initialize(): void {
    this.assetsUtil = AssetsUtil;
    this.stringsUtil = StringsUtil;
    this.status = {} as TStatus;
  }

}
