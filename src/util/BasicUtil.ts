import {GetResult, Preferences} from "@capacitor/preferences";

export class BasicUtil {

  /**
   * Transforma um tipo informado em um array contendo a chave e valor sendo a chave em formato string.
   *
   * @param objetoTipo
   *    Objeto do tipo informando, os valores pode ser nulos.
   *
   * @author Daniel Silva Marcelino
   */
  public criarObjetoPeloType<T>(objetoTipo: T): { [K in keyof T]: keyof T } {
    const result: { [K in keyof T]: keyof T } = {} as { [K in keyof T]: keyof T };

    for (const key in objetoTipo) {
      result[key] = key as keyof T;
    }

    return result;
  }

  /**
   * Valida se o existe o token de autenticação.
   *
   * @author Daniel Silva Marcelino
   */
  public isLogado(): Promise<boolean> {
    return Preferences.get({key: 'Bearer'}).then(
      (value: GetResult): boolean => {
        if (value.value) {
          const partes: string[] = value.value.trim().split('.');
          return partes.length === 3 || false;
        } else {
          return false;
        }
      }
    );
  }
}
