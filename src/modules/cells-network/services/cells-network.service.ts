import { Injectable } from "@nestjs/common";
import { ResponseResultsHelper } from "src/common/helpers/response-results.helper";
import { CellsNetworkCreateDTO } from "src/modules/cells-network/dto/cells-network.create.dto";
import { CellsNetworkUpdateDTO } from "src/modules/cells-network/dto/cells-network.update.dto";
import { PrismaService } from "src/modules/prisma/services/prisma.service";

const selectFields = {
  id: true,
  churchId: true,
  name: true,
  slug: true,
  color: true,
  image: true,
  supervisorId: true,
  active: true,
  createdAt: true,
  updatedAt: true,
  supervisor: {
    select: {
      name: true,
      gender: true,
      birth: true,
      photo: true,
      email: true,
      phone: true,
    },
  },
  cells: {
    select: {
      address: true,
      id: true,
      name: true,
      slug: true,
      color: true,
      image: true,
      day: true,
      hour: true,
      method: true,
      leaderId: true,
      leader: {
        select: {
          name: true,
          gender: true,
          birth: true,
          photo: true,
          email: true,
          phone: true,
        },
      },
      host: true,
      active: true,
      createdAt: true,
      updatedAt: true,
    },
  },
};

@Injectable()
export class CellsNetworkService {
  // eslint-disable-next-line prettier/prettier
  constructor(private readonly prisma: PrismaService) { }
  private collection = "cells-network";

  async create(data: CellsNetworkCreateDTO) {
    const dataExists = await this.prisma.cellNetwork.findFirst({
      where: {
        name: data.name,
      },
    });
    if (dataExists) {
      ResponseResultsHelper.RegisterAlreadyExists(this.collection);
    }
    const church = await this.prisma.cellNetwork.create({
      data,
    });

    return church;
  }

  async findAll() {
    return await this.prisma.cellNetwork.findMany({
      select: selectFields,
    });
  }

  async findOne(id: string) {
    return await this.prisma.cellNetwork.findUnique({ where: { id }, select: selectFields });
  }

  async update(id: string, data: CellsNetworkUpdateDTO) {
    const dataExists = await this.prisma.cellNetwork.findUnique({
      where: {
        id,
      },
    });
    if (!dataExists) ResponseResultsHelper.RegisterNotExists(this.collection);
    return await this.prisma.cellNetwork.update({
      data,
      where: {
        id,
      },
    });
  }

  async delete(id: string) {
    const dataExists = await this.prisma.cellNetwork.findUnique({
      where: {
        id,
      },
    });
    if (!dataExists) ResponseResultsHelper.RegisterNotExists(this.collection);
    await this.prisma.cellNetwork.delete({
      where: {
        id,
      },
    });
    return ResponseResultsHelper.RegisterDeleted(this.collection);
  }
}
