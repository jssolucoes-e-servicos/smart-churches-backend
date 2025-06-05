import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { compare, hash } from "bcrypt";
import { DeleteRegisterDTO } from "src/common/dto/delete-register.dto";
import { GendersEnum, LoginStatsEnum, MaritalStatusEnum } from "src/common/enums";
import { ResponseResultsHelper } from "src/common/helpers/response-results.helper";
import { IFindWithName } from "src/common/interfaces";
import { LoggerService } from "src/modules/logger/services/logger.service";
import { PrismaService } from "src/modules/prisma/services/prisma.service";
import { UserCreateDTO } from "src/modules/users/dto/users.create.dto";
import { UserUpdateDTO } from "src/modules/users/dto/users.update.dto";

const selectUserFields = {
  id: true,
  name: true,
  gender: true,
  birth: true,
  photo: true,
  email: true,
  createdAt: true,
  updatedAt: true,
  church: true,
  documents: true,
  addresses: true,
  phones: true,
  modules: true,
  hasAccess: true,
  permitChurch: true,
  permitPortal: true,
  networksSupervisor: {
    select: {
      id: true,
      image: true,
      name: true,
      color: true,
    },
  },
  cellsMembership: {
    select: {
      id: true,
      isLeader: true,
      isLet: true,
      isMember: true,
      isSupervisor: true,
      cell: {
        select: {
          id: true,
          name: true,
          slug: true,
          color: true,
          image: true,
          leader: {
            select: {
              id: true,
              name: true,
              gender: true,
            },
          },
        },
      },
    },
  },
};

@Injectable()
export class UsersService {
  private readonly _name: string = this.constructor.name;
  constructor(
    private readonly _prisma: PrismaService,
    private readonly _logger: LoggerService
    // eslint-disable-next-line prettier/prettier
  ) { }

  async create(churchId: string, data: UserCreateDTO) {
    if (!data.email && !data.phone) {
      ResponseResultsHelper.HandleError("É necessário informar pelo menos um e-mail ou telefone.");
    }

    const filters: Prisma.UserWhereInput[] = [
      data.email ? { email: data.email } : undefined,
      data.phone ? { phone: data.phone } : undefined,
    ].filter(Boolean) as Prisma.UserWhereInput[];

    const dataExists = await this._prisma.user.findFirst({
      where: {
        churchId: churchId,
        OR: filters,
      },
    });

    if (dataExists) {
      ResponseResultsHelper.RegisterAlreadyExists("User");
    }

    const hashedPassword: string = await (hash as (data: string, salt: number) => Promise<string>)(
      data.password ?? "1234@mudar",
      10
    );
    const user = await this._prisma.user.create({
      data: {
        ...data,
        gender: data.gender ?? GendersEnum.FEMALE,
        maritalStatus: data.maritalStatus ?? MaritalStatusEnum.SINGLE,
        password: hashedPassword,
        username: data.email ?? data.phone ?? null,
        hasAccess: true,
        loginAttempts: 3,
        loginStats: LoginStatsEnum.NOT_VERIFIELD,
        inRecovery: false,
        permitChurch: false,
        permitPortal: true,
        lastLogin: null,
      },
    });

    return {
      ...user,
      password: undefined,
      hasAccess: undefined,
      loginAttempts: undefined,
      loginStats: undefined,
      inRecovery: undefined,
      permitChurch: undefined,
      permitPortal: undefined,
      lastLogin: undefined,
    };
  }

  async findGlobal(): Promise<any> {
    return await this._prisma.user.findMany({});
  }

  async findAll(churchId: string): Promise<any> {
    return await this._prisma.user.findMany({
      where: {
        churchId,
      },
      select: selectUserFields,
    });
  }

  async findOne(churchId: string, id: string) {
    return await this._prisma.user.findUnique({
      where: {
        id,
      },
      select: selectUserFields,
    });
  }

  async findWithName(churchId: string, data: IFindWithName) {
    const users = await this._prisma.user.findMany({
      where: {
        churchId: churchId,
        name: {
          contains: data.name,
          mode: "insensitive",
        },
      },
      select: selectUserFields,
    });
    return users;
  }

  async findByEmail(email: string): Promise<any> {
    const user = await this._prisma.user.findFirst({ where: { email } });
    return user;
  }

  async verifyPasswordToUnlock(userId: string, userPassword: string): Promise<boolean> {
    const user = await this._prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (user) {
      const isPasswordValid = await compare(userPassword, user.password);
      return isPasswordValid;
    }
    return false;
  }

  async findByUsernameToLogin(username: string): Promise<any> {
    const user = await this._prisma.user.findFirst({
      where: {
        username,
      },
      select: {
        ...selectUserFields,
        password: true,
      },
    });

    return user;
  }

  async update(id: string, data: UserUpdateDTO): Promise<any> {
    const dataExists = await this._prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!dataExists) {
      ResponseResultsHelper.RegisterAlreadyExists("User");
    }

    if (data.password) {
      data.password = await hash(data.password, 10);
    }

    const userUp = await this._prisma.user.update({
      where: { id },
      data: {
        name: data.name,
        gender: data.gender,
        maritalStatus: data.maritalStatus,
        birth: data.birth,
        photo: data.photo,
        email: data.email,
        username: data.username,
      },
    });

    return userUp;
  }

  async validateForDelete(userId: string, password: string): Promise<boolean> {
    const user = await this._prisma.user.findUnique({ where: { id: userId } });
    if (user) {
      const isPasswordValid = await compare(password, user.password);
      return isPasswordValid;
    }
    return false;
  }

  async delete(data: DeleteRegisterDTO): Promise<boolean> {
    const registerExists = await this._prisma.user.findUnique({
      where: {
        id: data.registerId,
      },
    });
    if (!registerExists) {
      ResponseResultsHelper.RegisterNotExists("User");
    }
    if (!this.validateForDelete) {
      ResponseResultsHelper.HandleError("User not permited action");
    }

    await this._prisma.user.update({
      data: {
        active: false,
      },
      where: {
        id: data.registerId,
      },
    });
    return true;
  }
}
