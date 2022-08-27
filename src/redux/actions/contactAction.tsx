import axios from '../../config/axios'
import { contactFailed, contactList, contactLoading } from '../reducers/contactReducer'

export const getContacts = () => async (dispatch: any) => {
    dispatch(contactLoading(true))
    axios.get('/contact')
        .then(res => dispatch(contactList({ data: res.data.data, loading: false })))
        .catch(err => dispatch(contactFailed({ loading: false, failed: err?.message })))
}