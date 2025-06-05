import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { compare } from "bcrypt";
import { ResponseResultsHelper } from "src/common/helpers/response-results.helper";
import { IUserResponse } from "src/common/interfaces";
import { UsersService } from "src/modules/users/services/users.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService
    // eslint-disable-next-line prettier/prettier
  ) { }

  async validateUser(username: string, userPassword: string): Promise<any> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const user: any = await this.usersService.findByUsernameToLogin(username);
    if (user) {
      //console.log('Usuário encontrado:', user);
      if (!user.hasAccess) ResponseResultsHelper.HandleError("Usuário sem permissão de acesso.");

      const isPasswordValid = await compare(userPassword, user.password);
      if (isPasswordValid) {
        return {
          ...user,
          password: undefined,
        };
      } else {
        ResponseResultsHelper.HandleError("Dados de acesso inválidos.");
      }
    }
    ResponseResultsHelper.HandleError(`Não encontramos usuário com o username: ${username}.`);
    console.log("user not found");
    return null;
  }

  login(user: IUserResponse /* actTFA = false */) {
    const payload = { username: user.username, sub: user.id, churchId: user.churhId };
    const access_token = this.jwtService.sign(payload);
    return {
      access_token: user.TwoFactorAuthenticationActive ? null : access_token,
      user: user,
      churchId: user.churhId,
      TFA: user.TwoFactorAuthenticationActive,
    };
  }

  // async verifyPlatformAccess(user: IUserResponse, app: string) {
  /*  let result: ResultAccessPermit = null;
    switch (app) {
      case 'ead':
        result = {
          permit: user.permitEAD,
          message: user.permitEAD
            ? 'ok'
            : `${user.name}, você não tem acesso a aplicação: smartChurch - Plataforma de EAD, procure o administrador de sua instituição.`,
        };
        break;
      case 'church':
        result = {
          permit: user.permitChurch,
          message: user.permitChurch
            ? 'ok'
            : `${user.name}, você não tem acesso a aplicação: smartChurch - Sistema de Gestão, procure o administrador de sua instituição.`,
        };
        break;
      case 'cms':
        result = {
          permit: user.permitEAD_CMS,
          message: user.permitEAD_CMS
            ? 'ok'
            : `${user.name}, você não tem acesso a aplicação: smartChurch - Sistema de Gestão de Matriculas no EAD, procure o administrador de sua instituição.`,
        };
        break;
      case 'portal':
        result = {
          permit: user.permitPortal,
          message: user.permitPortal
            ? 'ok'
            : `${user.name}, você não tem acesso a aplicação: smartChurch - Portal do Membro, procure o administrador de sua instituição.`,
        };
        break;
      default:
        break;
    } */
  // return result;
  // }

  async unlock(data: { personId: string; password: string }) {
    return this.usersService.verifyPasswordToUnlock(data.personId, data.password);
  }
}
