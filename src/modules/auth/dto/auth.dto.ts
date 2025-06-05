import { ApiProperty } from "@nestjs/swagger";
import { StringValidator } from "src/common/validators";

export class AuthDTO {
  @ApiProperty({ default: "jackson144" })
  @StringValidator({ fieldName: "username", label: "Nome de usuário" })
  username: string;

  @ApiProperty({ default: "password" })
  @StringValidator({ fieldName: "password", label: "Senha", minLength: 6 })
  password: string;
}
