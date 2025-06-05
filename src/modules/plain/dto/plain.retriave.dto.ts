import { PartialType } from "@nestjs/swagger";
import { MongoIdValidator, StringValidator } from "src/common/validators";
import { PlainCreateDTO } from "./plain.create.dto";

export class PlainRetrieveDTO extends PartialType(PlainCreateDTO) {
  @MongoIdValidator({ fieldName: "id" })
  id: string;

  @StringValidator({ fieldName: "createdAt" })
  createdAt: Date;

  @StringValidator({ fieldName: "updatedAt" })
  updatedAt: Date;
}
