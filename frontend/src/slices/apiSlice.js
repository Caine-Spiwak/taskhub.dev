import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constants";

const baseQuery = fetchBaseQuery({baseUrl: BASE_URL})

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['Project', 'Task', 'Todo', 'User'],
  // eslint-disable-next-line no-unused-vars
  endpoints: (builder) => ({})
})