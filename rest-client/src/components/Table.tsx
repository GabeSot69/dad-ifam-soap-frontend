import { useEffect, useMemo, useState } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from 'material-react-table';
import axios from 'axios';

export type Product = {
    id: bigint;
    nome: string;
    quantidade: number;
    precoUnitario: number;
    data: Date;
  };

const Example = ({data}) => {
  
  const columns = useMemo<MRT_ColumnDef<Product>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'id',
        filterVariant: 'autocomplete', // default
        size: 100,
      },
      {
        accessorKey: 'nome',
        header: 'nome',
        filterVariant: 'autocomplete', // default
        size: 200,
      },
      {
        accessorKey: 'quantidade',
        header: 'quantidade',
        filterVariant: 'autocomplete',
        size: 100,
      },
      {
        accessorKey: 'precoUnitario',
        header: 'precoUnitario',
        filterVariant: 'autocomplete', // default
        size: 100,
      },
      {
        accessorKey: 'data',
        header: 'data',
        filterVariant: 'autocomplete', // default
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

//Date Picker Imports - these should just be in your Context Provider
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

const ExampleWithLocalizationProvider = ({data}) => (
  //App.tsx or AppProviders file
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <Example data={data}/>
  </LocalizationProvider>
);

export default ExampleWithLocalizationProvider;