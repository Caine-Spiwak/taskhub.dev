import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeProjectId: localStorage.getItem('activeProjectId') ? 
	JSON.parse(localStorage.getItem('activeProjectId')) : null
}

const activeProjectSlice = createSlice({
	name: 'activeProject',
	initialState,
	reducers: {
		setActiveProject: (state, action) => {
			state.activeProjectId = action.payload
			localStorage.setItem('activeProjectId', JSON.stringify(action.payload))
		},
		defaultActiveProject: (state, action) => {
			const projects = action.payload
			if (state.activeProjectId === null) {
				state.activeProjectId = projects[0]._id
				localStorage.setItem('activeProjectId', JSON.stringify(state.activeProjectId))
			}
		},
		removeActiveProject: (state) => {
			state.activeProjectId = null
			localStorage.removeItem('activeProjectId')
		}
	}
})

export const { setActiveProject, defaultActiveProject, removeActiveProject } = activeProjectSlice.actions

export default activeProjectSlice.reducer