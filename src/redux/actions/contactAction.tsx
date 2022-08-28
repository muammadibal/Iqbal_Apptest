import axios from '../../config/axios'
import { contactFailed, contactList, contactLoading, detailContact, detailContactFailed, detailContactLoading } from '../reducers/contactReducer'

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