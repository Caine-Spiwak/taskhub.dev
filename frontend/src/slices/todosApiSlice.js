import { apiSlice } from "./apiSlice";
const TODOS_URL = '/api/todos'

export const tasksApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
		getTodos: builder.query({
			query: ({ activeProjectId, taskId }) => ({
				url: `${TODOS_URL}/${activeProjectId}/${taskId}`,
			}),
			providesTags: ['Todos']
		}),
		createTodo: builder.mutation({
			query: (data) => ({
				url: `${TODOS_URL}`,
				method: 'POST',
				body: data
			}),
			invalidatesTags: ['Todos', 'Tasks']
		}),
		deleteTodo: builder.mutation({
			query: (data) => ({
				url: `${TODOS_URL}`,
				method: 'DELETE',
				body: data
			}),
			invalidatesTags: ['Todos', 'Tasks']
		}),
		updateTodo: builder.mutation({
			query: (data) => ({
				url: `${TODOS_URL}`,
				method: 'PUT',
				body: data
			}),
			invalidatesTags: ['Todos','Tasks']
		})
	})
})

export const {
  useGetTodosQuery,
  useCreateTodoMutation,
  useDeleteTodoMutation,
  useUpdateTodoMutation
} = tasksApiSlice