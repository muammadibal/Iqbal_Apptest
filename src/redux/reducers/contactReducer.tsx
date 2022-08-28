import { createSlice } from '@reduxjs/toolkit'

const contactSlice = createSlice({
    name: 'contact',
    initialState: {
        lists: [],
        loading: false,
        failed: '',
        detailLoading: false,
        detail: {},
        detailFailed: '',
        postContactLoading: '',
        postContactSuccess: '',
        postContactFailed: '',
        updateContactLoading: '',
        updateContactSuccess: '',
        updateContactFailed: '',
        deleteContactLoading: '',
        deleteContactSuccess: '',
        deleteContactFailed: '',
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
            state.detailFailed = action.payload.failed
        },
        postContactLoading(state, action) {
            state.postContactLoading = action.payload
        },
        postContact(state, action) {
            state.postContactLoading = action.payload.loading
            state.postContactSuccess = action.payload.message
        },
        postContactFailed(state, action) {
            state.postContactLoading = action.payload.loading
            state.postContactFailed = action.payload.failed
        },
        updateContactLoading(state, action) {
            state.updateContactLoading = action.payload
        },
        updateContact(state, action) {
            state.updateContactLoading = action.payload.loading
            state.updateContactSuccess = action.payload.message
        },
        updateContactFailed(state, action) {
            state.updateContactLoading = action.payload.loading
            state.updateContactFailed = action.payload.failed
        },
        deleteContactLoading(state, action) {
            state.deleteContactLoading = action.payload
        },
        deleteContact(state, action) {
            state.deleteContactLoading = action.payload.loading
            state.deleteContactSuccess = action.payload.message
        },
        deleteContactFailed(state, action) {
            state.deleteContactLoading = action.payload.loading
            state.deleteContactFailed = action.payload.failed
        },
    }
})

export const {
    contactList,
    contactLoading,
    contactFailed,
    detailContactLoading,
    detailContact,
    detailContactFailed,
    postContactLoading,
    postContact,
    postContactFailed,
    updateContactLoading,
    updateContact,
    updateContactFailed,
    deleteContactLoading,
    deleteContact,
    deleteContactFailed } = contactSlice.actions
export default contactSlice.reducer