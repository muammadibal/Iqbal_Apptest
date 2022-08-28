import axios from '../../config/axios'
import { shownMessage } from '../../utils/shownMessage'
import { contactFailed, contactList, contactLoading, detailContact, detailContactFailed, detailContactLoading, postContact, postContactFailed, postContactLoading } from '../reducers/contactReducer'

export const getContacts = () => async (dispatch: any) => {
    dispatch(contactLoading(true))
    axios.get('/contact')
        .then(res => dispatch(contactList({ data: res.data.data, loading: false })))
        .catch(err => dispatch(contactFailed({ loading: false, failed: err?.message })))
}

export const getDetailContacts = (payload: any) => async (dispatch: any) => {
    dispatch(detailContactLoading(true))
    axios.get(`/contact/${payload}`)
        .then(res => dispatch(detailContact({ data: res.data.data, loading: false })))
        .catch(err => dispatch(detailContactFailed({ loading: false, failed: err?.message })))
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
            shownMessage({ description: err?.message })
            dispatch(postContactFailed({ loading: false, failed: err?.message }))
        })
}