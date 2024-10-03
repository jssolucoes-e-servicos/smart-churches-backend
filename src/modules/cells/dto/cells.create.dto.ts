import { ApiPropertyOptional } from '@nestjs/swagger';
import { AddressDTO } from 'src/common/dto/Address.dto';
import { CellOrMeetMethodEnum, WeekDayEnum } from 'src/common/enums';
import { MongoIdValidator, StringValidator } from 'src/common/validators';

export class CellsCreateDTO {
  @MongoIdValidator({ fieldName: 'churchId', label: 'ID da igreja' })
  churchId: string;

  @StringValidator({ fieldName: 'name', label: 'Nome' })
  name: string;

  @StringValidator({ fieldName: 'slug', label: 'Slug', optional: true })
  slug?: string | null;

  @StringValidator({ fieldName: 'color', label: 'Cor da rede em hexadecima', optional: true })
  color?: string;

  @StringValidator({ fieldName: 'image', label: 'URL da Imagem', optional: true })
  image?: string;

  @StringValidator({ fieldName: 'day', label: 'Dia da Semana', optional: true })
  day: WeekDayEnum;

  @StringValidator({ fieldName: 'hour', label: 'Horário' })
  hour: string;

  @StringValidator({ fieldName: 'method', label: 'Tipo de célula' })
  method: CellOrMeetMethodEnum;

  @MongoIdValidator({ fieldName: 'leaderId', label: 'ID do Lider' })
  leaderId: string;

  @StringValidator({ fieldName: 'host', label: 'Nome do anfitrião', optional: true })
  host: string;

  @ApiPropertyOptional({ description: 'Endereço da célula' })
  address?: AddressDTO;

  @MongoIdValidator({ fieldName: 'cellsNetworkId', label: 'ID da Rede' })
  cellsNetworkId: string;
}
