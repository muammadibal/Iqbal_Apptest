import { createSlice } from '@reduxjs/toolkit'

const contactSlice = createSlice({
    name: 'contact',
    initialState: {
        lists: [],
        loading: false,
        failed: ''
    },
    reducers: {
        contactLoading(state, action) {
            state.loading = action.payload
        },
        contactList(state, action) {
            state.lists = action.payload.data
            state.loading = action.payload.loading
        },
        contactFailed(state, action) {
            state.loading = action.payload.loading
            state.failed = action.payload.failed
        }
    }
})

export const { contactList, contactLoading, contactFailed } = contactSlice.actions
export default contactSlice.reducer