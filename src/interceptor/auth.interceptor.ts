import {HttpHandlerFn, HttpInterceptorFn, HttpRequest} from "@angular/common/http";
import {Preferences} from "@capacitor/preferences";
import {ErrorHandlerService} from "../handler/error-handler.service";
import {catchError, from, mergeMap} from "rxjs";
import {inject} from "@angular/core";

export const AuthInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const errorHandlerService: ErrorHandlerService = inject(ErrorHandlerService);
  return from(Preferences.get({ key: 'Bearer' })).pipe(
    mergeMap((value: any) => {
      const chave = value?.value || null;
      if (chave) {
        req = req.clone({
          setHeaders: {
            Authorization: 'Bearer ' + chave,
          },
        });
      }

      return next(req).pipe(
        catchError((error) => errorHandlerService.handleError(error))
      );
    })
  );
}
