import { Body, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { OpenControllerTag } from "src/common/decorators";
import { PlainCreateDTO } from "src/modules/plain/dto/plain.create.dto";
import { PlainUpdateDTO } from "src/modules/plain/dto/plain.update.dto";
import { PlainService } from "src/modules/plain/services/plain.service";
import { PlainRetrieveDTO } from "../dto/plain.retriave.dto";

@OpenControllerTag("Plains", "plains")
export class PlainController {
  constructor(private readonly _service: PlainService) { }

  @Post()
  async create(@Body() data: PlainCreateDTO): Promise<PlainRetrieveDTO> {
    return this._service.create(data);
  }

  @Get()
  async findAll(): Promise<PlainRetrieveDTO[]> {
    return this._service.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") id: string): Promise<any> {
    return this._service.findOne(id);
  }

  //@Auth()
  @Patch(":id")
  async update(@Param("id") id: string, @Body() data: PlainUpdateDTO): Promise<any> {
    return this._service.update(id, data);
  }

  //@Auth()
  @Delete(":id")
  async delete(@Param("id") id: string): Promise<any> {
    return this._service.delete(id);
  }
}
