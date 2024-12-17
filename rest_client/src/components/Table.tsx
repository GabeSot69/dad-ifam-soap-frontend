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

const Example = () => {
  const [data, setData] = useState([
    {
      "id": 3,
      "nome": "RTX 3090",
      "quantidade": 2,
      "precoUnitario": 7.00,
      "dataCadatro": "2025-02-01 12:20:50"
    },
    {
      "id": 4,
      "nome": "RTX 3070",
      "quantidade": 1,
      "precoUnitario": 2.00,
      "dataCadatro": "2021-02-01 12:20:50"
    },
  ]);
  
  const columns = useMemo<MRT_ColumnDef<Product>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'id',
        filterVariant: 'text',
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