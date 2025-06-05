import { Body, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { AuthControllerTag } from "src/common/decorators/auth-controller-tag.decorator";
import { CellsNetworkCreateDTO } from "src/modules/cells-network/dto/cells-network.create.dto";
import { CellsNetworkUpdateDTO } from "src/modules/cells-network/dto/cells-network.update.dto";
import { CellsNetworkService } from "src/modules/cells-network/services/cells-network.service";

@AuthControllerTag("Cells Networks", "cells-networks")
export class CellsNetworkController {
  constructor(private readonly cellsNetworkService: CellsNetworkService) { }

  @Post()
  async create(@Body() data: CellsNetworkCreateDTO) {
    return this.cellsNetworkService.create(data);
  }

  @Get()
  async findAll() {
    return this.cellsNetworkService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    return this.cellsNetworkService.findOne(id);
  }

  @Put(":id")
  async update(@Param("id") id: string, @Body() data: CellsNetworkUpdateDTO) {
    return this.cellsNetworkService.update(id, data);
  }

  @Delete(":id")
  async delete(@Param("id") id: string) {
    return this.cellsNetworkService.delete(id);
  }
}
