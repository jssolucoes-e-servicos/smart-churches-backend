import { MongoIdValidator, StringValidator } from "src/common/validators";

export class DeleteRegisterDTO {
  @MongoIdValidator({ fieldName: "userId", label: "ID Usuario" })
  userId: string;

  @StringValidator({ fieldName: "password", label: "Senha" })
  password: string;

  @StringValidator({ fieldName: "registerId", label: "ID para Deletar" })
  registerId: string;
}
