import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

/**
 * Class com validações gerais para formulários.
 *
 * @author Daniel Silva Marcelino
 */
export class ValidateFormUtil {

  /**
   * Método que realiza a validação do campo de telefone celular, mitigando número inexistentes.
   *
   * @author Daniel Silva Marcelino
   */
  public static telefone(abstractControl: AbstractControl): ValidationErrors | null {
    if (String(abstractControl.value).match('.((10)|([1-9][1-9]).)\\s9[6-9][0-9]{3}-[0-9]{4}') ||
      String(abstractControl.value).match('.((10)|([1-9][1-9]).)\\s[2-5][0-9]{3}-[0-9]{4}')) {
      return null;
    }

    return {telefone: 'Informe um número de telefone válido.'};
  }

  /**
   * Valida se a string tem uma quantidade de letras maisculas.
   *
   * @param quantidade
   *    Quantidade de letras a validar.
   *
   * @author Daniel Silva Marcelino
   */
  public static validarMaiuscula(quantidade: number): ValidatorFn {
    return (abstractControl: AbstractControl): ValidationErrors | null => {
      if (abstractControl.value && abstractControl.value.length > 0) {
        let contador: number = 0;
        const string: string = (<string>abstractControl.value);
        for (let i: number = 0; i < string.length; i++) {
          if (string[i] >= 'A' && string[i] <= 'Z') {
            contador++;
            if (contador === quantidade) {
              return null;
            }
          }
        }

        return {maiuscula: 'Necessário ter ao menos ' + quantidade + ' caractere(s) maiúsculo.'};
      } else {
        return null;
      }
    }
  }

  /**
   * Método que realiza a comparação dos campos de senha.
   *
   * @param senhaControlName
   *    Nome do controlador de senha do formulário.
   *
   * @param confirmarSenhaControlName
   *    Nome do controlador de confirmar senha do formulário.
   *
   * @author Daniel Silva Marcelino
   */
  public static compararSenhas(senhaControlName: string, confirmarSenhaControlName: string): ValidatorFn {
    return (abstractControl: AbstractControl): ValidationErrors | null => {
      const firstPassword = abstractControl.get(senhaControlName)?.value;
      const secondPassword = abstractControl.get(confirmarSenhaControlName)?.value;
      if ((firstPassword && secondPassword) && (firstPassword !== secondPassword)) {
        const errosConfirmarSenha: ValidationErrors | null | undefined = abstractControl.get(confirmarSenhaControlName)?.errors
        abstractControl.get(confirmarSenhaControlName)?.setErrors({
          ...errosConfirmarSenha,
          senhasDiferentes: "As senhas não correspondem."
        });
        const errosSenha: ValidationErrors | null | undefined = abstractControl.get(senhaControlName)?.errors
        abstractControl.get(senhaControlName)?.setErrors({
          ...errosSenha,
          senhasDiferentes: "As senhas não correspondem."
        });
        return null;
      }
      if ((firstPassword && secondPassword) && (firstPassword === secondPassword)) {
        delete abstractControl.get(confirmarSenhaControlName)?.errors?.['senhasDiferentes'];
        delete abstractControl.get(senhaControlName)?.errors?.['senhasDiferentes'];
        const errorsConfirmarSenha = abstractControl.get(senhaControlName)?.errors;
        if (!errorsConfirmarSenha || Object.keys(errorsConfirmarSenha).length === 0) {
          abstractControl.get(senhaControlName)?.setErrors(null);
        }
        const errorsSenha = abstractControl.get(confirmarSenhaControlName)?.errors;
        if (!errorsSenha || Object.keys(errorsSenha).length === 0) {
          abstractControl.get(confirmarSenhaControlName)?.setErrors(null);
        }
        return null;
      } else {
        return null;
      }
    }
  }

  /**
   * Método que valida o campo do nome completo para saber se ele está vázio ou foi digitado apenas espaços.
   *
   * @author Daniel Silva Marcelino
   */
  public static nomeCompleto(abstractControl: AbstractControl): ValidationErrors | null {
    const nomeCompleto: string = String(abstractControl.value).trim()
      .replace('\\s+', ' ')
      .replace('^\\s+', '')
      .replace('\\s+$', '')
      .replace('[!#$%&\'()*+,-./:;?@[\\\]_`{|}~]', '');

    if (nomeCompleto !== '' && nomeCompleto.length >= 4 && nomeCompleto.indexOf(' ') > 1) {
      return null;
    }

    return {nomeCompleto: 'Informar ao menos um sobrenome'}
  }

  /**
   * Valida o cpf de acordo com o algorítmo de CPF.
   *
   * @author Daniel Silva Marcelino
   */
  public static cpf(abstractControl: AbstractControl): ValidationErrors | null {
    const cpf: string = String(abstractControl.value).replace(/[^\d]+/g, '');
    const erro: { validacaoCpf: string } = {validacaoCpf: 'CPF inválido.'};

    if (!cpf) {
      return erro;
    }
    if (cpf.length !== 11) {
      return erro;
    }
    if ((cpf === '00000000000') || (cpf === '11111111111') || (cpf === '22222222222') || (cpf === '33333333333') ||
      (cpf === '44444444444') || (cpf === '55555555555') || (cpf === '66666666666') || (cpf === '77777777777') ||
      (cpf === '88888888888') || (cpf === '99999999999')) {
      return erro;
    }
    let numero: number = 0;
    let caracter: string = '';
    const numeros: string = '0123456789';
    let j: number = 10;
    let somatorio: number = 0;
    let resto: number = 0;
    let digito1: number = 0;
    let digito2: number = 0;
    let cpfAux: string = '';
    cpfAux = cpf.substring(0, 9);
    for (let i: number = 0; i < 9; i++) {
      caracter = cpfAux.charAt(i);
      if (numeros.search(caracter) === -1) {
        return erro;
      }
      numero = Number(caracter);
      somatorio = somatorio + (numero * j);
      j--;
    }
    resto = somatorio % 11;
    digito1 = 11 - resto;
    if (digito1 > 9) {
      digito1 = 0;
    }
    j = 11;
    somatorio = 0;
    cpfAux = cpfAux + digito1;
    for (let i: number = 0; i < 10; i++) {
      caracter = cpfAux.charAt(i);
      numero = Number(caracter);
      somatorio = somatorio + (numero * j);
      j--;
    }
    resto = somatorio % 11;
    digito2 = 11 - resto;
    if (digito2 > 9) {
      digito2 = 0;
    }
    cpfAux = cpfAux + digito2;
    if (cpf !== cpfAux) {
      return erro;
    }

    return null;
  }

  /**
   * Valida o cnpj de acordo com o algorítmo de CNPJ.
   *
   * @author Daniel Silva Marcelino
   */
  public static cnpj(): ValidatorFn {
    return (abstractControl: AbstractControl): ValidationErrors | null => {
      const cnpj: string = String(abstractControl.value).replace(/[^\d]+/g, '');
      const erro: { validacaoCnpj: string } = {validacaoCnpj: 'CNPJ inválido.'};

      if (cnpj === '') {
        return erro;
      }

      if (cnpj.length !== 14) {
        return erro;
      }

      // Elimina CNPJs invalidos conhecidos
      if (cnpj === '00000000000000' ||
        cnpj === '11111111111111' ||
        cnpj === '22222222222222' ||
        cnpj === '33333333333333' ||
        cnpj === '44444444444444' ||
        cnpj === '55555555555555' ||
        cnpj === '66666666666666' ||
        cnpj === '77777777777777' ||
        cnpj === '88888888888888' ||
        cnpj === '99999999999999') {
        return erro;
      }

      // Valida DVs
      let tamanho: number = cnpj.length - 2;
      let numeros: string = cnpj.substring(0, tamanho);
      const digitos: string = cnpj.substring(tamanho);
      let soma: number = 0;
      let pos: number = tamanho - 7;
      for (let i: number = tamanho; i >= 1; i--) {
        soma += parseInt(numeros.charAt(tamanho - i), 10) * pos--;
        if (pos < 2) {
          pos = 9;
        }
      }
      let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
      if (resultado !== parseInt(digitos.charAt(0), 10)) {
        return erro;
      }

      tamanho = tamanho + 1;
      numeros = cnpj.substring(0, tamanho);
      soma = 0;
      pos = tamanho - 7;
      for (let i: number = tamanho; i >= 1; i--) {
        soma += parseInt(numeros.charAt(tamanho - i), 10) * pos--;
        if (pos < 2) {
          pos = 9;
        }
      }
      resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
      if (resultado !== parseInt(digitos.charAt(1), 10)) {
        return erro;
      }

      return null;
    }
  }

}
