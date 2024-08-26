import { HttpErrorResponse } from '@angular/common/http'
import { ErrorHandler, Injectable } from '@angular/core'
import { throwError } from 'rxjs'
import {AlertaUtil} from "../util/AlertaUtil";
import {AlertController, LoadingController} from "@ionic/angular";
import {StringsUtil} from "../util/StringsUtil";

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService implements ErrorHandler {

  alertaUtil: AlertaUtil;

  constructor(private alertController: AlertController, private loadingController: LoadingController) {
    this.alertaUtil = new AlertaUtil(this.alertController, this.loadingController);
  }

  public handleError(response: HttpErrorResponse) {
    switch (response.status) {
      case 409:
        this.alertaUtil.alertaErro(response.error.message).then((): void => {});
        break
      case 403:
        this.alertaUtil.alertaAtencao(StringsUtil.tokenExpirou).then((): void => {});
        location.reload()
        localStorage.clear()
        break
      case 401:
        this.alertaUtil.alertaErro(response.error.message).then((): void => {});
        break
      case 400:
        this.alertaUtil.alertaAtencao(response.error.message).then((): void => {});
        break
      case 0:
        this.alertaUtil.alertaAtencao(StringsUtil.semConexaoComServidor).then((): void => {});
        break
    }
    return throwError(() => new Error())
  }
}
