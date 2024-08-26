import {AlertController, LoadingController} from '@ionic/angular';

/**
 * Classe com todos os alertas de mensagens para uso.
 *
 * @author Daniel Silva Marcelino
 */
export class AlertaUtil {

  private carregando: any;

  constructor(public alertController: AlertController, public loadingController: LoadingController) {
  }

  /**
   * Alerta de atenção.
   *
   * @param mensagem
   *      Mensagem a ser apresentada.
   *
   * @author Daniel Silva Marcelino
   */
  public async alertaAtencao(mensagem: string): Promise<void> {
    const alert: HTMLIonAlertElement = await this.alertController.create({
      header: 'Atenção',
      message: mensagem,
      buttons: ['OK']
    });
    await alert.present();
  }

  /**
   * Alerta de sucesso.
   *
   * @param mensagem
   *      Mensagem a ser apresentada.
   *
   * @author Daniel Silva Marcelino
   */
  public async alertaSucesso(mensagem: string): Promise<void> {
    const alert: HTMLIonAlertElement = await this.alertController.create({
      header: 'Sucesso',
      message: mensagem,
      buttons: ['OK']
    });
    await alert.present();
  }

  /**
   * Alerta de erro.
   *
   * @param mensagem
   *      Mensagem a ser apresentada.
   *
   * @author Daniel Silva Marcelino
   */
  public async alertaErro(mensagem: string): Promise<void> {
    const alert: HTMLIonAlertElement = await this.alertController.create({
      header: 'Erro',
      message: mensagem,
      buttons: ['OK']
    });
    await alert.present();
  }

  /**
   * Janela de carregando.
   *
   * @param mensagem
   *      Mensagem a ser apresentada.
   *
   * @author Daniel Silva Marcelino
   */
  public async alertaCarregando(mensagem?: string): Promise<void> {
    this.carregando = await this.loadingController.create({
      message: mensagem ? mensagem : 'Aguarde...'
    });
    await this.carregando.present();
  }

  /**
   * Fecha a janela de carregando.
   *
   * @author Daniel Silva Marcelino
   */
  public fecharAlertaCarregando(): void {
    if (this.carregando) {
      this.carregando.dismiss();
    }
  }
}
