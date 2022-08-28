import axios from '../../config/axios'
import { shownMessage } from '../../utils/shownMessage'
import { contactFailed, contactList, contactLoading, deleteContact, deleteContactFailed, deleteContactLoading, detailContact, detailContactFailed, detailContactLoading, postContact, postContactFailed, postContactLoading, updateContact, updateContactFailed, updateContactLoading } from '../reducers/contactReducer'

export const getContacts = () => async (dispatch: any) => {
    dispatch(contactLoading(true))
    axios.get('/contact')
        .then(res => dispatch(contactList({ data: res.data.data, loading: false })))
        .catch(err => dispatch(contactFailed({ loading: false, failed: err?.message })))
}

export const getDetailContacts = (payload: any) => async (dispatch: any) => {
    dispatch(detailContactLoading(true))
    axios.get(`/contact/${payload}`)
        .then(res => dispatch(detailContact({ loading: false, data: res.data.data, })))
        .catch(err => {
            dispatch(detailContactFailed({ loading: false, failed: err?.message }))
        })
}

export const addContacts = (payload: any, navigation: any) => async (dispatch: any) => {
    dispatch(postContactLoading(true))
    axios.post(`/contact`, payload)
        .then(res => {
            shownMessage({ type: 'success', description: res.data.message })
            dispatch(postContact({ data: res.data.message, loading: false }))
            navigation.goBack()
        })
        .catch(err => {
            console.log('err', err)
            shownMessage({ description: err?.message })
            dispatch(postContactFailed({ loading: false, failed: err?.message }))
        })
}

export const editContacts = (payload: any, id: string, navigation: any) => async (dispatch: any) => {
    dispatch(updateContactLoading(true))
    axios.put(`/contact/${id}`, payload)
        .then(res => {
            shownMessage({ type: 'success', description: res.data.message })
            dispatch(updateContact({ data: res.data.message, loading: false }))
            navigation.goBack()
        })
        .catch(err => {
            shownMessage({ description: err?.message })
            dispatch(updateContactFailed({ loading: false, failed: err?.message }))
        })
}

export const deleteContacts = (payload: any) => async (dispatch: any) => {
    dispatch(deleteContactLoading(true))
    axios.delete(`/contact/${payload}`)
        .then(res => {
            dispatch(getContacts())
            shownMessage({ type: 'success', description: res?.data?.message || 'Delete contact success' })
            dispatch(deleteContact({ data: res?.data?.message || 'Delete contact success', loading: false }))
        })
        .catch(err => {
            shownMessage({ description: err?.message })
            dispatch(deleteContactFailed({ loading: false, failed: err?.message }))
        })
}