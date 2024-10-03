import { Injectable, NotFoundException } from '@nestjs/common';
import { ResponseResultsHelper } from 'src/common/helpers/response-results.helper';
import { ChurchCreateDTO } from 'src/modules/church/dto/church.create.dto';
import { ChurchUpdateDTO } from 'src/modules/church/dto/church.update.dto';
import { LoggerService } from 'src/modules/logger/services/logger.service';
import { PrismaService } from 'src/modules/prisma/services/prisma.service';

@Injectable()
export class ChurchService {
  private _name = this.constructor.name;

  constructor(
    private readonly _prisma: PrismaService,
    private readonly _logger: LoggerService,
  ) {}

  async create(data: ChurchCreateDTO) {
    const dataExists = await this._prisma.church.findUnique({
      where: { cnpj: data.cnpj },
    });

    if (dataExists) {
      ResponseResultsHelper.RegisterAlreadyExists('Church');
    }

    const church = await this._prisma.church.create({
      data: {
        ...data,
        address: {
          ...data.address,
          ibgeCodes: { ...data.address.ibgeCodes },
          location: { ...data.address.location },
        },
      },
    });

    this._logger.setLog(this._name, 'Church created successfully');
    return church;
  }

  async findAll() {
    const churches = await this._prisma.church.findMany();
    if (!churches.length) {
      throw new NotFoundException('No churches found');
    }
    return churches;
  }

  async findOne(id: string) {
    const church = await this._prisma.church.findUnique({ where: { id: id } });
    if (!church) {
      throw new NotFoundException(`Church with id ${id} not found`);
    }
    return church;
  }

  async findByDomain(domain: string) {
    const church = await this._prisma.church.findFirst({
      where: { customDomain: domain },
    });

    this._logger.setWarn(this._name, `Church searched by domain: ${domain}`);
    /*  if (!church) {
      throw new NotFoundException(`Church with domain ${domain} not found`);
    } */
    return church;
  }

  async update(id: string, data: ChurchUpdateDTO) {
    const church = await this._prisma.church.findUnique({ where: { id: id } });
    if (!church) {
      ResponseResultsHelper.RegisterNotExists('Church');
    }

    const updatedChurch = await this._prisma.church.update({
      where: { id },
      data,
    });

    this._logger.setLog(this._name, `Church with id ${id} updated`);
    return updatedChurch;
  }

  async delete(id: string) {
    const church = await this._prisma.church.findUnique({ where: { id } });
    if (!church) {
      ResponseResultsHelper.RegisterNotExists('Church');
    }

    await this._prisma.church.delete({ where: { id } });
    this._logger.setLog(this._name, `Church with id ${id} deleted`);
    return ResponseResultsHelper.RegisterDeleted('Church');
  }
}

/* import { Injectable } from '@nestjs/common';
import { ResponseResultsHelper } from 'src/common/helpers/response-results.helper';


import { ChurchCreateDTO } from 'src/modules/church/dto/church.create.dto';
import { ChurchUpdateDTO } from 'src/modules/church/dto/church.update.dto';
import { LoggerService } from 'src/modules/logger/services/logger.service';
import { PrismaService } from 'src/modules/prisma/services/prisma.service';

@Injectable()
export class ChurchService {
  private _name = this.constructor.name;
  constructor(
    private readonly _prisma: PrismaService,
    private readonly _logger: LoggerService,
  ) {}

  async create(data: ChurchCreateDTO) {
    const dataExists = await this._prisma.church.findUnique({
      where: {
        cnpj: data.cnpj,
      },
    });
    if (dataExists) {
      ResponseResultsHelper.RegisterAlreadyExists('Church');
    }
    const church = await this._prisma.church.create({
      data: {
        name: data.name,
        fantasy: data.fantasy,
        cnpj: data.cnpj,
        ie: data.ie,
        shepherd: data.shepherd,
        email: data.email,
        phone: data.phone,
        isThirst: data.isThirst,
        plainId: data.plainId,
        address: {
          type: 'comercial',
          cep: data.address.cep,
          street: data.address.street,
          number: data.address.number,
          complement: data.address.complement,
          neighborhood: data.address.neighborhood,
          city: data.address.city,
          state: data.address.state,
          inLine: data.address.inLine,
          ibgeCodes: {
            city: data.address.ibgeCodes.city,
            state: data.address.ibgeCodes.state,
          },
          location: {
            lat: data.address.location.lat,
            lng: data.address.location.lng,
          },
        },
      },
    });

    return church;
  }

  async findAll() {
    return await this._prisma.church.findMany();
  }

  async findOne(id: string) {
    return await this._prisma.church.findUnique({ where: { id } });
  }

  async findByDomain(domain: string) {
    const church = await this._prisma.church.findFirst({
      where: {
        customDomain: domain,
      },
    });
    this._logger.setWarn(this._name, `church searched of domain: ${domain}`);
    console.log(church);
    return church;
  }

  async update(id: string, data: ChurchUpdateDTO) {
    const dataExists = await this._prisma.church.findUnique({
      where: {
        id,
      },
    });
    if (!dataExists) ResponseResultsHelper.RegisterNotExists('Church');
    return await this._prisma.church.update({
      data,
      where: {
        id,
      },
    });
  }

  async delete(id: string) {
    const dataExists = await this._prisma.church.findUnique({
      where: {
        id,
      },
    });
    if (!dataExists) ResponseResultsHelper.RegisterNotExists('Church');
    await this._prisma.church.delete({
      where: {
        id,
      },
    });
    return ResponseResultsHelper.RegisterDeleted('Church');
  }
}
 */
