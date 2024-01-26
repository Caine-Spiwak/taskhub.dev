import { apiSlice } from "./apiSlice";
const TASKS_URL = '/api/tasks'

export const tasksApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
		getTasks: builder.query({
			query: (id) => ({
				url: `${TASKS_URL}/${id}`,
			}),
			providesTags: ['Tasks']
		}),
		createTask: builder.mutation({
			query: (data) => ({
				url: `${TASKS_URL}`,
				method: 'POST',
				body: data
			}),
			invalidatesTags: ['Tasks']
		}),
		deleteTask: builder.mutation({
			query: (data) => ({
				url: `${TASKS_URL}`,
				method: 'DELETE',
				body: data
			}),
			invalidatesTags: ['Tasks']
		}),
		updateTask: builder.mutation({
			query: (data) => ({
				url: `${TASKS_URL}`,
				method: 'PUT',
				body: data
			}),
			invalidatesTags: ['Tasks']
		})
	})
})

export const {
	useGetTasksQuery,
	useDeleteTaskMutation,
	useUpdateTaskMutation,
	useCreateTaskMutation
} = tasksApiSlice