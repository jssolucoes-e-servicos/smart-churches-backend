import { applyDecorators } from "@nestjs/common";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsOptional } from "class-validator";

export function EnumValidator<T extends Record<string, string | number>>(params: {
  fieldName: string;
  label?: string;
  enum: T;
  optional?: boolean;
  description?: string;
}) {
  const { fieldName, label, enum: enumType, optional = false, description } = params;
  const enumValues = Object.values(enumType);

  const propertyDecorator = optional ? ApiPropertyOptional : ApiProperty;

  const finalLabel = label || fieldName;

  if (optional) {
    return applyDecorators(
      IsEnum(enumType, {
        message: `Campo ${finalLabel} deve ser um valor válido`,
      }),
      IsOptional(),
      propertyDecorator({
        name: fieldName,
        description: description,
        enum: enumValues,
      })
    );
  } else {
    return applyDecorators(
      IsEnum(enumType, {
        message: `Campo ${finalLabel} deve ser um valor válido`,
      }),
      IsNotEmpty({
        message: `Campo ${finalLabel} é obrigatório`,
      }),
      propertyDecorator({
        name: fieldName,
        description: description,
        enum: enumValues,
      })
    );
  }
}
