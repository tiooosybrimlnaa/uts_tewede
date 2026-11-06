import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Query,
} from '@nestjs/common';
import { graphql } from 'graphql';
import { GraphQLRequestDto } from './graphql-request.dto.js';
import { penyewaanGraphQLSchema } from './graphql.schema.js';
import { PenyewaanService } from '../penyewaan/penyewaan.service.js';

@Controller('graphql')
export class GraphQLController {
  constructor(private readonly penyewaanService: PenyewaanService) {}

  @Post()
  execute(@Body() request: GraphQLRequestDto) {
    return this.runQuery(request);
  }

  @Get()
  executeGet(
    @Query('query') query: string,
    @Query('operationName') operationName?: string,
  ) {
    return this.runQuery({ query, operationName });
  }

  private runQuery(request: GraphQLRequestDto) {
    if (
      typeof request.query !== 'string' ||
      request.query.trim().length === 0
    ) {
      throw new BadRequestException('Field query wajib diisi.');
    }

    return graphql({
      schema: penyewaanGraphQLSchema,
      source: request.query,
      variableValues: request.variables,
      operationName: request.operationName,
      contextValue: { penyewaanService: this.penyewaanService },
    });
  }
}
