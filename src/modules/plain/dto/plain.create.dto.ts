import { NestedDTOValidator, StringValidator } from "src/common/validators";
import { PlainAttibutesDTO } from "./attributes.dto";
import { PlainPricesDTO } from "./prices.dto";

export class PlainCreateDTO {
  @StringValidator({ fieldName: "name", label: "Nome", minLength: 5 })
  name: string;

  @StringValidator({ fieldName: "description", label: "Descrição", minLength: 10 })
  description: string;

  @NestedDTOValidator({ fieldName: "attributes", label: "Atributos", dto: PlainAttibutesDTO, isArray: true })
  attributes: PlainAttibutesDTO[];

  @NestedDTOValidator({ fieldName: "prices", label: "Preços", dto: PlainPricesDTO })
  prices: PlainPricesDTO;

  /* @StringValidator({
    fieldName: "maritalStatus",
    label: "Estado Civil",
    optional: true,
  }) */
}
