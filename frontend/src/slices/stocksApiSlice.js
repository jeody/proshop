import { STOCKS_URL, UPLOAD_URL } from '../constants';
import { apiSlice } from './apiSlice';

export const stocksApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStocks: builder.query({
      query: ({ keyword, pageNumber }) => ({
        url: STOCKS_URL,
        params: {
          keyword,
          pageNumber,
        },
      }),
      providesTags: ['Stocks'],
      keepUnusedDataFor: 5,
    }),
    getStockDetails: builder.query({
      query: (stockId) => ({
        url: `${STOCKS_URL}/edit/${stockId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    deleteStock: builder.mutation({
      query: (stockId) => ({
        url: `${STOCKS_URL}/${stockId}`,
        method: 'DELETE',
      }),
    }),
    createStock: builder.mutation({
      query: () => ({
        url: STOCKS_URL,
        method: 'POST',
      }),
      invalidatesTags: ['Stock'],
    }),
    createNewStock: builder.mutation({
      query: (stockId) => ({
        url: `${STOCKS_URL}/${stockId}`,
        method: 'POST',
      }),
      invalidatesTags: ['Stock'],
    }),
    updateStock: builder.mutation({
      query: (data) => ({
        url: `${STOCKS_URL}/${data.stockId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Stocks'],
    }),
    uploadStockImage: builder.mutation({
      query: (data) => ({
        url: `${UPLOAD_URL}`,
        method: 'POST',
        body: data,
      }),
    }),
    getAdminStocks: builder.query({
      query: ({ userId, keyword, pageNumber }) => ({
        url: `${STOCKS_URL}/mylist`,
        params: {
          userId,
          keyword,
          pageNumber,
        },
      }),
      providesTags: ['Stocks'],
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useGetStocksQuery,
  useGetStockDetailsQuery,
  useDeleteStockMutation,
  useCreateStockMutation,
  useCreateNewStockMutation,
  useUpdateStockMutation,
  useUploadStockImageMutation,
  useGetAdminStocksQuery,
} = stocksApiSlice;
