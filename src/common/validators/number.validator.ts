import { applyDecorators } from "@nestjs/common";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, Max, Min } from "class-validator";

interface INumberValidator {
  fieldName: string;
  label?: string;
  optional?: boolean;
  description?: string;
  example?: number;
  min?: number;
  max?: number;
}

export function NumberValidator({
  fieldName,
  label,
  optional = false,
  description,
  example,
  min,
  max,
}: INumberValidator) {
  const propertyLabel = label || fieldName;
  const propertyDescription = description || propertyLabel;

  const decorators: PropertyDecorator[] = [];

  decorators.push(
    IsNumber(
      { allowNaN: false, allowInfinity: false },
      {
        message: `Campo ${propertyLabel} deve ser um número válido`,
      }
    )
  );

  if (min !== undefined) {
    decorators.push(
      Min(min, {
        message: `Campo ${propertyLabel} deve ser maior ou igual a ${min}`,
      })
    );
  }

  if (max !== undefined) {
    decorators.push(
      Max(max, {
        message: `Campo ${propertyLabel} deve ser menor ou igual a ${max}`,
      })
    );
  }

  if (optional) {
    decorators.push(IsOptional());
    decorators.push(
      ApiPropertyOptional({
        name: fieldName,
        description: propertyDescription,
        example,
        type: Number,
      })
    );
  } else {
    decorators.push(
      IsNotEmpty({
        message: `Campo ${propertyLabel} é obrigatório`,
      })
    );
    decorators.push(
      ApiProperty({
        name: fieldName,
        description: propertyDescription,
        example,
        type: Number,
      })
    );
  }

  return applyDecorators(...decorators);
}
