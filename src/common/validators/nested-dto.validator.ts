import { applyDecorators } from "@nestjs/common";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { ArrayNotEmpty, IsArray, IsNotEmptyObject, IsOptional, ValidateNested } from "class-validator";

export function NestedDTOValidator<T>(params: {
  fieldName: string;
  label?: string;
  dto: new () => T;
  optional?: boolean;
  description?: string;
  isArray?: boolean;
}) {
  const { fieldName, label = fieldName, dto, optional = false, description, isArray = false } = params;

  const propertyDecorator = optional ? ApiPropertyOptional : ApiProperty;

  const decorators = [
    Type(() => dto),
    propertyDecorator({
      name: fieldName,
      description,
      type: isArray ? [dto] : dto,
    }),
  ];

  if (isArray) {
    decorators.push(IsArray());
    decorators.push(ValidateNested({ each: true }));
    if (!optional) decorators.push(ArrayNotEmpty({ message: `Campo ${label} é obrigatório e não pode ser vazio` }));
    else decorators.push(IsOptional());
  } else {
    decorators.push(ValidateNested());
    decorators.push(optional ? IsOptional() : IsNotEmptyObject({}, { message: `Campo ${label} é obrigatório` }));
  }

  return applyDecorators(...decorators);
}
