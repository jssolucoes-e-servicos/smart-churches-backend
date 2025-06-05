import { MongoIdValidator, StringValidator } from 'src/common/validators';

export class CellsNetworkCreateDTO {
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

  //@StringValidator({ label: 'ID do plano', })
  @MongoIdValidator({ fieldName: 'supervisorId', label: 'ID DO Supervisor' })
  supervisorId: string;
}
