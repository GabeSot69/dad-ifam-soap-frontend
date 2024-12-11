import { useMemo } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from 'material-react-table';
import { citiesList, data, type Person, usStateList } from './makeData';

export type Product = {
    id: bigint;
    nome: string;
    quantidade: number;
    precoUnitario: number;
    dataCadastro: Date;
  };

const Example = () => {
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

//Date Picker Imports - these should just be in your Context Provider
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

const ExampleWithLocalizationProvider = () => (
  //App.tsx or AppProviders file
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <Example />
  </LocalizationProvider>
);

export default ExampleWithLocalizationProvider;