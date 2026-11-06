import { IsObject, IsOptional, IsString, MinLength } from 'class-validator';

export class GraphQLRequestDto {
  @IsString()
  @MinLength(1)
  query!: string;

  @IsOptional()
  @IsObject()
  variables?: Record<string, unknown>;

  @IsOptional()
  @IsString()
  operationName?: string;
}
