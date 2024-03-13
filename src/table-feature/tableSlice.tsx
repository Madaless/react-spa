import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface TableProperties {
    filterById: string,
    page: number,
    totalPages: number,
}

const initialState: TableProperties = {
    page: 1,
    totalPages: 1,
    filterById: ""
}

export const counterSlice = createSlice({
    name: 'table',
    initialState,
    reducers: {
        setFilterByID: (state, action: PayloadAction<string>) => {
            state.filterById = action.payload;
        },
        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload;
        },
        setTotalPages: (state, action: PayloadAction<number>) => {
            state.totalPages = action.payload;
        },
        handlePageChange: (state, action: PayloadAction<number>) => {
            state.page = action.payload;
        },
        handleFilterChange: (state, action: PayloadAction<string>) => {
            state.filterById = action.payload;
        },
    },
})

// Action creators are generated for each case reducer function
export const { setFilterByID, setPage, setTotalPages, handleFilterChange, handlePageChange } = counterSlice.actions

export default counterSlice.reducer
