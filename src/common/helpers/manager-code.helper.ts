import crypto from "crypto";
export class ManagerCodeHelper {
  private static recoveryCodeLength = 12;
  private static numberOfCodes = 10;

  static generateSecureRecoveryCodes(): string[] {
    const codes: string[] = [];
    for (let i = 0; i < this.numberOfCodes; i++) {
      const buffer = crypto.randomBytes(this.recoveryCodeLength / 2); // Cada byte representa 2 caracteres hexadecimais
      codes.push(buffer.toString("hex").toUpperCase()); // Converter para hexadecimal para facilitar a digitação
    }
    return codes;
  }

  static formatRecoveryCode(code: string, segmentLength = 4, separator = "-"): string {
    const segments: string[] = [];
    for (let i = 0; i < code.length; i += segmentLength) {
      segments.push(code.substring(i, i + segmentLength));
    }
    return segments.join(separator);
  }

  static generateAndFormatRecoveryCodes(): string[] {
    const rawCodes = this.generateSecureRecoveryCodes();
    return rawCodes.map((code) => this.formatRecoveryCode(code));
  }
}
