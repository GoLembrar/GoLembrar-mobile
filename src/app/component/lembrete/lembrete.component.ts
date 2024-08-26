import {Component, Input, OnInit} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {AssetsUtil} from "../../../util/AssetsUtil";
import {TagContatoComponent} from "../tag-contato/tag-contato.component";
import {IonCard, IonCardContent, IonCardHeader, IonCol, IonLabel, IonRow} from "@ionic/angular/standalone";
import {TagStatusComponent} from "../tag-status/tag-status.component";

@Component({
  selector: 'go-lembrar-lembrete',
  standalone: true,
  templateUrl: './lembrete.component.html',
  styleUrls: ['./lembrete.component.scss'],
  imports: [
    IonCard,
    NgOptimizedImage,
    TagContatoComponent,
    IonCardHeader,
    IonRow,
    IonCol,
    IonLabel,
    IonCardContent,
    TagStatusComponent
  ]
})
export class LembreteComponent  implements OnInit {

  public assetsUtil = AssetsUtil;

  @Input() public title: string;
  @Input() public dateTime: string;
  @Input() public isOpen: boolean;
  @Input() public content: string;

  constructor() {
    this.initialize();
  }

  ngOnInit(): void {}

  /**
   * Initialize the variablend objects necessary.
   *
   * @private
   *
   * @author Daniel Silva Marcelino
   */
  private initialize(): void {
    this.title = 'vamos testar um título e enquanto testa a gente testa o título';
    this.dateTime = '01/01/2020 13:25';
    this.isOpen = false;
    this.content = 'Lorem ipsum dolor sit amet consectetur. Volutpat et est suspendisse eget ultrices non purus.';
  }

}
