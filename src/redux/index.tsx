import { configureStore } from '@reduxjs/toolkit'
import contactReducer from './reducers/contactReducer'

const store = configureStore({
    reducer: {
        contact: contactReducer,
    }
})

export default store