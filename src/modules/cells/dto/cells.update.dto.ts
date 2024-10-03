import { PartialType } from '@nestjs/mapped-types';
import { CellsCreateDTO } from 'src/modules/cells/dto/cells.create.dto';

export class CellsUpdateDTO extends PartialType(CellsCreateDTO) {}
