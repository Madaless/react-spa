import { configureStore } from '@reduxjs/toolkit'
import { listOfProductsApi } from '../table-feature/api'
import tableReducer from '../table-feature/tableSlice'

export const store = configureStore({
    reducer: {
        // Add the generated reducer as a specific top-level slice
        [listOfProductsApi.reducerPath]: listOfProductsApi.reducer,
        table: tableReducer,
    },
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(listOfProductsApi.middleware),
})


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
