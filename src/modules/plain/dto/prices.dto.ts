import { NumberValidator } from "src/common/validators";

export class PlainPricesDTO {
  @NumberValidator({ fieldName: "monthly", label: "Mensal" })
  monthly: number;

  @NumberValidator({ fieldName: "quarterly", label: "Trimestral" })
  quarterly: number;

  @NumberValidator({ fieldName: "biannual", label: "Semestral" })
  biannual: number;

  @NumberValidator({ fieldName: "annual", label: "Anual" })
  annual: number;
}
