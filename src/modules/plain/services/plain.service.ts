import { Injectable } from "@nestjs/common";
import { ResponseResultsHelper } from "src/common/helpers/response-results.helper";
import { IFindWithName } from "src/common/interfaces";
import { LoggerService } from "src/modules/logger/services/logger.service";
import { PlainCreateDTO } from "src/modules/plain/dto/plain.create.dto";
import { PlainRetrieveDTO } from "src/modules/plain/dto/plain.retriave.dto";
import { PlainUpdateDTO } from "src/modules/plain/dto/plain.update.dto";
import { PrismaService } from "src/modules/prisma/services/prisma.service";

@Injectable()
export class PlainService {
  private readonly _name: string = this.constructor.name;
  constructor(
    private readonly _prisma: PrismaService,
    private readonly _logger: LoggerService
  ) { }

  async create(data: PlainCreateDTO): Promise<PlainRetrieveDTO> {
    const plain = await this._prisma.plain.create({
      data: data,
    });

    return plain;
  }

  async findAll(): Promise<PlainRetrieveDTO[]> {
    return await this._prisma.plain.findMany({ where: { active: true } });
  }

  async findOne(id: string): Promise<any> {
    const plain = await this._prisma.plain.findUnique({
      where: {
        id,
      },
    });
    if (!plain?.active) {
      ResponseResultsHelper.RegisterAlreadyExists("Plain");
    }
    return plain;
  }

  async findWithName(data: IFindWithName): Promise<PlainRetrieveDTO[]> {
    const plains = await this._prisma.plain.findMany({
      where: {
        name: {
          contains: data.name,
          mode: "insensitive",
        },
        active: true,
      },
    });
    return plains;
  }

  async update(id: string, data: PlainUpdateDTO): Promise<any> {
    const dataExists = await this._prisma.plain.findUnique({
      where: {
        id,
        active: true,
      },
    });
    if (!dataExists) {
      ResponseResultsHelper.RegisterAlreadyExists("Plain");
    }

    const plain = await this._prisma.plain.update({
      where: { id },
      data: data,
    });

    return plain;
  }

  async delete(id: string): Promise<any> {
    const dataExists = await this._prisma.plain.findUnique({
      where: {
        id,
      },
    });
    if (!dataExists) {
      //throw new Error("Plain does not exixts");
      ResponseResultsHelper.RegisterAlreadyExists("Plain");
    }

    return await this._prisma.plain.update({
      data: {
        active: false,
      },
      where: {
        id,
      },
    });
  }
}
