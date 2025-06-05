import { GendersEnum, LoginStatsEnum, MaritalStatusEnum } from "src/common/enums";
import {
  BooleanValidator,
  EmailValidator,
  EnumValidator,
  MongoIdValidator,
  NumberValidator,
  StringValidator,
} from "src/common/validators";

export class UserCreateDTO {
  @MongoIdValidator({ fieldName: "churchId", label: "ID da Igreja" })
  churchId: string;

  @StringValidator({ fieldName: "name", label: "Nome", minLength: 10 })
  name: string;

  @EnumValidator({ fieldName: "gender", label: "Genero", optional: true, enum: GendersEnum })
  gender?: GendersEnum | null;

  @StringValidator({
    fieldName: "birth",
    label: "Data de nacimento",
    optional: true,
  })
  birth?: Date | string | null;

  @EnumValidator({
    fieldName: "maritalStatus",
    label: "Estado Civil",
    optional: true,
    enum: MaritalStatusEnum,
  })
  maritalStatus?: MaritalStatusEnum | null;

  @StringValidator({ fieldName: "genre", label: "Genero", optional: true })
  baptismDate: Date | string | null;

  @StringValidator({ fieldName: "genre", label: "Genero", optional: true })
  conversionDate: Date | string | null;

  @StringValidator({ fieldName: "genre", label: "Genero", optional: true })
  occupation?: string | null;

  @StringValidator({ fieldName: "genre", label: "Genero", optional: true })
  educationLevel?: string | null;

  @StringValidator({ fieldName: "genre", label: "Genero", optional: true })
  observations?: string | null;

  @BooleanValidator({ fieldName: "hasAccess", label: "Tem acesso", optional: true })
  hasAccess?: boolean | null;

  @NumberValidator({ fieldName: "loginAttempts", label: "loginAttempts", optional: true })
  loginAttempts?: number | null;

  @EnumValidator({
    fieldName: "loginStats",
    label: "Status de Login",
    enum: LoginStatsEnum,
    optional: true,
    description: "Status atual do login",
  })
  loginStats?: LoginStatsEnum;

  @BooleanValidator({ fieldName: "hasAccess", label: "Tem acesso", optional: true })
  inRecovery?: boolean | null;

  @BooleanValidator({ fieldName: "permitChurch", label: "Permitir acesso sistema?", optional: true })
  permitChurch?: boolean | null;

  @BooleanValidator({ fieldName: "permitPortal", label: "Permii acesso portal?", optional: true })
  permitPortal?: boolean | null;

  @StringValidator({ fieldName: "username", label: "Login", optional: true })
  username?: string | null;

  @StringValidator({ fieldName: "password", label: "Senha", optional: true })
  password?: string | null;

  @StringValidator({ fieldName: "lastLogin", label: "Ultimo acesso", optional: true })
  lastLogin?: Date | string | null;

  @EmailValidator({ fieldName: "email", label: "Email", optional: true })
  email?: string | null;

  @StringValidator({ fieldName: "genre", label: "Genero", optional: true })
  phone?: string | null;

  @StringValidator({ fieldName: "photo", label: "Foto", optional: true })
  photo?: string | null;

  @BooleanValidator({ fieldName: "member", label: "Membro", optional: true })
  member?: boolean | null;

  @StringValidator({ fieldName: "memberId", label: "Código de Membro", optional: true })
  memberId?: string | null;

  @StringValidator({ fieldName: "signedAt", label: "Arrolado em", optional: true })
  signedAt?: Date | string | null;

  @StringValidator({ fieldName: "signedBy", label: "Arrolado por", optional: true })
  signedBy?: string | null;

  @BooleanValidator({ fieldName: "isTithesPayer", label: "Dizimista", optional: true })
  isTithesPayer?: boolean | null;

  @BooleanValidator({ fieldName: "isVoluntary", label: "Voluntario", optional: true })
  isVoluntary?: boolean | null;

  @BooleanValidator({ fieldName: "isVisitors", label: "Visitante", optional: true })
  isVisitors?: boolean | null;
}
