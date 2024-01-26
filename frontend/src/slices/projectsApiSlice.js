import { apiSlice } from "./apiSlice";
const PROJECTS_URL = '/api/projects'


export const projectsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
		getProjects: builder.query({
			query: (id) => ({
				url: `${PROJECTS_URL}/${id}`,
			}),
			providesTags: ['Project']
		}),
		createProject: builder.mutation({
			query: (data) => ({
				url: `${PROJECTS_URL}`,
				method: 'POST', 
				body: data
			}),
			invalidatesTags: ['Project']
		}),
		deleteProject: builder.mutation({
			query: (data) => ({
				url: `${PROJECTS_URL}`,
				method: 'DELETE',
				body: data
			}),
			invalidatesTags: ['Project']
		}),
		updateProject: builder.mutation({
			query: (data) => ({
				url: `${PROJECTS_URL}`,
				method: 'PUT',
				body: data
			}),
			invalidatesTags: ['Project']
		})
  })
})

export const { 
	useGetProjectsQuery, 
	useCreateProjectMutation,
	useDeleteProjectMutation,
	useUpdateProjectMutation
} = projectsApiSlice