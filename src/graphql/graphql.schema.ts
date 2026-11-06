import {
  GraphQLFloat,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLNonNull,
} from 'graphql';
import type { PenyewaanService } from '../penyewaan/penyewaan.service.js';

interface GraphQLContext {
  penyewaanService: PenyewaanService;
}

interface PenyewaanGraphQLSource {
  tanggalSewa: Date;
  tanggalKembali: Date;
}

const PelangganType = new GraphQLObjectType({
  name: 'Pelanggan',
  fields: {
    id: { type: new GraphQLNonNull(GraphQLInt) },
    nama: { type: new GraphQLNonNull(GraphQLString) },
  },
});

const KendaraanType = new GraphQLObjectType({
  name: 'Kendaraan',
  fields: {
    id: { type: new GraphQLNonNull(GraphQLInt) },
    platNomor: { type: new GraphQLNonNull(GraphQLString) },
    merk: { type: new GraphQLNonNull(GraphQLString) },
    model: { type: new GraphQLNonNull(GraphQLString) },
    biayaSewa: { type: new GraphQLNonNull(GraphQLFloat) },
  },
});

const PenyewaanType = new GraphQLObjectType({
  name: 'Penyewaan',
  fields: {
    id: { type: new GraphQLNonNull(GraphQLInt) },
    tanggalSewa: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (penyewaan: PenyewaanGraphQLSource) =>
        penyewaan.tanggalSewa.toISOString(),
    },
    tanggalKembali: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (penyewaan: PenyewaanGraphQLSource) =>
        penyewaan.tanggalKembali.toISOString(),
    },
    totalBiaya: { type: new GraphQLNonNull(GraphQLFloat) },
    pelanggan: { type: new GraphQLNonNull(PelangganType) },
    kendaraan: { type: new GraphQLNonNull(KendaraanType) },
  },
});

export const penyewaanGraphQLSchema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      daftarPenyewaan: {
        type: new GraphQLNonNull(
          new GraphQLList(new GraphQLNonNull(PenyewaanType)),
        ),
        resolve: (_source, _args, context: GraphQLContext) =>
          context.penyewaanService.findAll(),
      },
    },
  }),
});
