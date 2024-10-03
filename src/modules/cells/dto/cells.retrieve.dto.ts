import { PartialType } from '@nestjs/mapped-types';
import { CellsCreateDTO } from 'src/modules/cells/dto/cells.create.dto';

export class CellsRetrieveDTO extends PartialType(CellsCreateDTO) {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}
