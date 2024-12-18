import { useMemo, useState } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from 'material-react-table';

export type Product = {
    id: bigint;
    nome: string;
    quantidade: number;
    precoUnitario: number;
    dataCadastro: Date;
  };

const Example = ({data}) => {
  
  const columns = useMemo<MRT_ColumnDef<Product>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'id',
        size: 170,
      },
      {
        accessorKey: 'nome',
        header: 'nome',
        size: 200,
      },
      {
        accessorKey: 'quantidade',
        header: 'quantidade',
        size: 200,
      },
      {
        accessorKey: 'precoUnitario',
        header: 'precoUnitario',
        size: 80,
      },
      {
        accessorKey: 'dataCadastro',
        header: 'dataCadastro',
        size: 200,
      },
    ],
    [],
  );

  const table = useMaterialReactTable({
    columns,
    data,
    initialState: { showColumnFilters: true },
  });

  return <MaterialReactTable table={table} />;
};

export default Example;