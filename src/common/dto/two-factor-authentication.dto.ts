import { BooleanValidator, NestedDTOValidator, StringValidator } from "src/common/validators";
export class RecoveryCodesDTO {
  @StringValidator({ fieldName: "one", label: "1" })
  one: string;

  @StringValidator({ fieldName: "two", label: "2" })
  two: string;

  @StringValidator({ fieldName: "three", label: "3" })
  three: string;

  @StringValidator({ fieldName: "four", label: "4" })
  four: string;

  @StringValidator({ fieldName: "five", label: "5" })
  five: string;
}

export class TwoFactorAuthenticationDTO {
  @BooleanValidator({ fieldName: "active", label: "Ativo", optional: true })
  active?: boolean;

  @StringValidator({ fieldName: "ascii", label: "ascii", optional: true })
  ascii?: string | null;

  @StringValidator({ fieldName: "hex", label: "hex", optional: true })
  hex?: string | null;

  @StringValidator({ fieldName: "base32", label: "base32", optional: true })
  base32?: string | null;

  @StringValidator({ fieldName: "otpauth_url", label: "otpauth_url", optional: true })
  otpauth_url?: string | null;

  @NestedDTOValidator({ fieldName: "shortcuts", label: "Atalhos", dto: RecoveryCodesDTO, optional: true })
  recoveryCodes: RecoveryCodesDTO;

  @StringValidator({ fieldName: "activedIn", label: "Ativado em", optional: true })
  activedIn?: Date | null;
}
