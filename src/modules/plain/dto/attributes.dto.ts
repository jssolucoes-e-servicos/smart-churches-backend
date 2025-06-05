import { StringValidator } from "src/common/validators";

export class PlainAttibutesDTO {
  @StringValidator({ fieldName: "icon", label: "Icone", minLength: 3 })
  icon: string;

  @StringValidator({ fieldName: "description", label: "Descrição", minLength: 3 })
  description: string;
}
