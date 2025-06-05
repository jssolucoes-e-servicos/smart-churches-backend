import { Injectable } from "@nestjs/common";
import { ResponseResultsHelper } from "src/common/helpers/response-results.helper";
import { CellsCreateDTO } from "src/modules/cells/dto/cells.create.dto";
import { CellsUpdateDTO } from "src/modules/cells/dto/cells.update.dto";
import { PrismaService } from "src/modules/prisma/services/prisma.service";

@Injectable()
export class CellsService {
  // eslint-disable-next-line prettier/prettier
  constructor(private readonly _prisma: PrismaService) { }
  private collection = "cells";

  async create(data: CellsCreateDTO) {
    const dataExists = await this._prisma.cell.findFirst({
      where: {
        name: data.name,
      },
    });
    console.log(dataExists);
    if (dataExists) {
      ResponseResultsHelper.RegisterAlreadyExists(this.collection);
    }
    const cell = await this._prisma.cell.create({
      data: {
        ...data,
        address: {
          set: {
            ...data.address,
            ibgeCodes: { ...data.address.ibgeCodes },
            location: { ...data.address.location },
          },
        },
      },
    });

    return cell;
  }

  async findAll() {
    return await this._prisma.cell.findMany();
  }

  async findOne(id: string) {
    return await this._prisma.cell.findUnique({ where: { id } });
  }

  async update(id: string, data: CellsUpdateDTO) {
    const dataExists = await this._prisma.cell.findUnique({
      where: {
        id,
      },
    });
    if (!dataExists) ResponseResultsHelper.RegisterNotExists(this.collection);
    return await this._prisma.cell.update({
      data,
      where: {
        id,
      },
    });
  }

  async delete(id: string) {
    const dataExists = await this._prisma.cell.findUnique({
      where: {
        id,
      },
    });
    if (!dataExists) ResponseResultsHelper.RegisterNotExists(this.collection);
    await this._prisma.cell.delete({
      where: {
        id,
      },
    });
    return ResponseResultsHelper.RegisterDeleted(this.collection);
  }
}
