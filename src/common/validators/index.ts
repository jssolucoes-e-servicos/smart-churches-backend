import { BooleanValidator } from "src/common/validators/boolean.validator";
import { CepValidator } from "src/common/validators/cep.validator";
import { EmailValidator } from "src/common/validators/email.validator";
import { MongoIdValidator } from "src/common/validators/mongo-id.validator";
import { PhoneValidator } from "src/common/validators/phone.validator";
import { StringValidator } from "src/common/validators/string.validator";
import { EnumValidator } from "./enum.validator";
import { NestedDTOValidator } from "./nested-dto.validator";
import { NumberValidator } from "./number.validator";

export {
  BooleanValidator,
  CepValidator,
  EmailValidator,
  EnumValidator,
  MongoIdValidator,
  NestedDTOValidator,
  NumberValidator,
  PhoneValidator,
  StringValidator,
};
