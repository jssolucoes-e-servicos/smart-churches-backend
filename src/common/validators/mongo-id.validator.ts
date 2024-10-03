import { applyDecorators } from "@nestjs/common";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsMongoId, IsNotEmpty, IsOptional } from "class-validator";
import { IMongoIdValidator } from "src/common/interfaces";

export function MongoIdValidator({ fieldName, label, optional = false, description }: IMongoIdValidator) {
  if (label === undefined) label = fieldName;

  if (description === undefined) description = label;

  if (optional === true) {
    return applyDecorators(
      IsMongoId({
        message: `Campo ${label} em formáto inválido`,
      }),
      IsOptional(),
      ApiPropertyOptional({
        name: fieldName,
        description: description,
      }),
    );
  }
  return applyDecorators(
    IsMongoId({
      message: `Campo ${label} em formáto inválido`,
    }),
    IsNotEmpty({
      message: `Campo ${label} é requirido`,
    }),
    ApiProperty({
      name: fieldName,
      description: description,
    }),
  );
}
