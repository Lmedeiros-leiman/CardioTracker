import { err, ok, type Result } from "neverthrow";

export type EmailError =
  | { kind: "empty_string" }
  | { kind: "malformed_unicode" }
  | { kind: "invalid_format"; input: string };

/**
 * Representa um endereco de email validado.
 *
 * A criacao da instancia e feita por {@link Email.create}, que retorna um
 * {@link Result} com falhas tipadas em vez de lancar erros no fluxo normal.
 */
export class Email {
  /**
   * Expressao regular usada para validar o formato do email.
   */
  public static readonly Regex = /^[\w\-.]+@([\w-]+\.)+[\w-]{2,4}$/;

  /**
   * Verifica se uma string atende ao formato esperado de email.
   *
   * @param input Texto a ser validado.
   * @returns `true` quando o texto corresponde ao formato de email esperado.
   */
  public static isValid(input: string): boolean {
    return Email.create(input).isOk();
  }

  /**
   * Valor primitivo normalizado e validado do email.
   */
  public readonly value: string;

  private constructor(value: string) {
    this.value = value;
  }

  /**
   * Tenta criar um {@link Email} a partir de uma string.
   *
   * Executa as validacoes de string vazia, Unicode bem formado e formato de
   * email, retornando um {@link Result} com erro tipado em caso de falha.
   *
   * @param input Texto que representa o email.
   * @returns `Ok<Email>` quando o valor e valido; caso contrario,
   * `Err<EmailError>`.
   */
  public static create(input: string): Result<Email, EmailError> {
    return ok(input)
      .andThen(Email.#checkNotEmpty)
      .andThen(Email.#checkUnicode)
      .andThen(Email.#checkFormat)
      .map((value) => new Email(value));
  }

  static #checkNotEmpty(input: string): Result<string, EmailError> {
    return input.trim().length > 0 ? ok(input) : err({ kind: "empty_string" });
  }

  static #checkUnicode(input: string): Result<string, EmailError> {
    return input.isWellFormed()
      ? ok(input)
      : err({ kind: "malformed_unicode" });
  }

  static #checkFormat(input: string): Result<string, EmailError> {
    return Email.Regex.test(input)
      ? ok(input)
      : err({ kind: "invalid_format", input });
  }

  public equals(other: Email): boolean {
    return this.value === other.value;
  }

  /**
   * Retorna o valor do email quando a instancia e convertida para primitivo.
   */
  public [Symbol.toPrimitive](): string {
    return this.value;
  }
}
