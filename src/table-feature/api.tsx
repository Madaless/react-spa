// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { ApiResponse, ApiFilterResponse } from '../model'
import { setTotalPages } from './tableSlice';

const BASE_API_URL = 'https://reqres.in/api/products';
const ONE_PAGE_IF_FILTERING = 1;

// Define a service using a base URL and expected endpoints
export const listOfProductsApi = createApi({
    reducerPath: 'productsApi',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_API_URL }),
    refetchOnMountOrArgChange: true,
    endpoints: (builder) => ({
        getProducts: builder.query<ApiResponse | ApiFilterResponse, { page?: number, id?: string }>({
            query: ({ page, id }) => `?page=${page}&id=${id}`,
            async onQueryStarted(id, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    if (data && 'total_pages' in data)
                        dispatch(setTotalPages(data.total_pages))
                    else
                        dispatch(setTotalPages(ONE_PAGE_IF_FILTERING))

                } catch (err) {
                    // `onError` side-effect
                    //dispatch(messageCreated('Error fetching post!'))
                }
            },

        }),
    })
})
// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetProductsQuery } = listOfProductsApi