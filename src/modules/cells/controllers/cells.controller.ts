import { Body, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AuthControllerTag } from 'src/common/decorators/auth-controller-tag.decorator';
import routes from 'src/common/routes';
import { CellsCreateDTO } from 'src/modules/cells/dto/cells.create.dto';
import { CellsUpdateDTO } from 'src/modules/cells/dto/cells.update.dto';
import { CellsService } from 'src/modules/cells/services/cells.service';

@AuthControllerTag('Cells', routes.cells)
export class CellsController {
  constructor(private readonly cellsService: CellsService) {}

  @Post()
  async create(@Body() data: CellsCreateDTO) {
    return this.cellsService.create(data);
  }

  @Get()
  async findAll() {
    return this.cellsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.cellsService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: CellsUpdateDTO) {
    return this.cellsService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.cellsService.delete(id);
  }
}
