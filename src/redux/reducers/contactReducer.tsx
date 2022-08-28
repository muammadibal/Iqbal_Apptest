import { createSlice } from '@reduxjs/toolkit'

const contactSlice = createSlice({
    name: 'contact',
    initialState: {
        lists: [],
        loading: false,
        failed: '',
        detailLoading: false,
        detail: {},
        detailFailed: ''
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
        },
        detailContactLoading(state, action) {
            state.detailLoading = action.payload
        },
        detailContact(state, action) {
            state.detailLoading = action.payload.loading
            state.detail = action.payload.data
        },
        detailContactFailed(state, action) {
            state.detailLoading = action.payload.loading
            state.detailFailed = action.payload.data
        }
    }
})

export const { contactList, contactLoading, contactFailed, detailContactLoading, detailContact, detailContactFailed } = contactSlice.actions
export default contactSlice.reducer