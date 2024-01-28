import { apiSlice } from "./apiSlice";
import { ORDERS_URL } from "../constants";

export const orderApiSlice = apiSlice.injectEndpoints({
    endpoints : (builder) => ({
        createOrder : builder.mutation({
            query:(order) => ({
                url: ORDERS_URL,
                method: 'POST',
                body: {...order}
            })
        }),
        getOrder: builder.query({
            query: (id) => ({
                url: `${ORDERS_URL}/${id}`
            }),
            keepUnusedDataFor: 5
        })
    })
})

export const {useCreateOrderMutation,useGetOrderQuery} = orderApiSlice