import { STOCKS_URL, UPLOAD_URL } from '../constants';
import { apiSlice } from './apiSlice';

export const stocksApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStocks: builder.query({
      query: () => ({
        url: STOCKS_URL,
      }),
      providesTags: ['Stocks'],
      keepUnusedDataFor: 5,
    }),
    getStockDetails: builder.query({
      query: (stockId) => ({
        url: `${STOCKS_URL}/${stockId}`,
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
      query: (data) => ({
        url: `${STOCKS_URL}/${data.stockId}`,
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
    uploadStockExcel: builder.mutation({
      query: (data) => ({
        url: `${STOCKS_URL}`,
        method: 'POST',
        body: data,
      }),
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
  useUploadStockExcelMutation,
} = stocksApiSlice;
