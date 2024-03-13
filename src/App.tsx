import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { TextField } from '@mui/material';
import Pagination from './table-feature/Pagination';
import ProductsTable from './table-feature/ProductsTable';
import { useAppDispatch, useAppSelector } from './configuration/hooks';
import { handleFilterChange, handlePageChange, setFilterByID } from './table-feature/tableSlice';


function App() {
  const table = useAppSelector(state => state.table)
  const dispatch = useAppDispatch()
  let [searchParams] = useSearchParams();

  useEffect(() => {
    const id = searchParams.get("id")
    const page = searchParams.get("page")
    if (id)
      dispatch(setFilterByID(id));
    if (page)
      dispatch(setFilterByID(page))
  }, [])

  return (
    <div style={{ padding: "15px" }}>
      <TextField
        label="Filter by ID"
        type="number"
        value={table.filterById}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          dispatch(handleFilterChange(e.target.value))
        }}
      />
      <ProductsTable />

      <Pagination
        page={table.page}
        totalPages={table.totalPages}
        onPageChange={(e) => {
          dispatch(handlePageChange(e))
        }}
      />

    </div>
  );
};

export default App;
