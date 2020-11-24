import {
    axiosInstance,
    axiosInstanceWithToken,
} from '../../axiosInstance/axiosInstance'
import { messages } from '../../messages/messages'
export const SET_IS_REGISTERED = 'SET_IS_REGISTERED'
export const SET_IS_LOGGED = 'SET_IS_LOGGED'
export const SET_IS_FETCHING = 'SET_FETCHING'
export const SET_IS_ERROR = 'SET_IS_ERROR'
export const SET_CLIENT_ID = 'SET_CLIENT_ID'
export const SET_CLEAR_STATE = 'SET_CLEAR_STATE'
export const SET_IS_CLEAR_ERROR = 'SET_IS_CLEAR_ERROR'
export const SET_IS_AUTHORIZED = 'SET_IS_AUTHORIZED'
export const SET_IS_LOG_OUT = 'SET_IS_LOG_OUT'
export const SET_IS_CLEAR_REGISTERED = 'SET_IS_CLEAR_REGISTERED'

export const thunkRegister = data => async dispatch => {
    try {
        dispatch(setIsFetching(true))

        await axiosInstance.post('http://erp.apptrix.ru/api/clients/create/', {
            ...data,
        })

        dispatch(
            setIsRegistered({
                has: true,
                title: 'Регистрация',
                msg: 'выполнена успешно',
            })
        )
        dispatch(setIsFetching(false))
    } catch (error) {
        dispatch(setIsFetching(false))
        dispatch(
            setIsError({
                has: true,
                title: 'Ошибка регистрации',
                msg: messages[error.message] || error.message,
            })
        )
    }
}

export const thunkLogin = data => async dispatch => {
    try {
        dispatch(setIsFetching(true))

        const responseToken = await axiosInstance.post(
            'http://erp.apptrix.ru/api/clients/token/',
            data
        )

        localStorage.setItem('access', responseToken.data.access)
        localStorage.setItem('refresh', responseToken.data.refresh)
        localStorage.setItem('client_id', responseToken.data.client_id)

        dispatch(setIsLogged(true))
        dispatch(setIsFetching(false))
    } catch (error) {
        dispatch(setIsFetching(false))

        dispatch(
            setIsError({
                has: true,
                title: 'Ошибка входа',
                msg: messages[error.message] || error.message,
            })
        )

        localStorage.removeItem('access')
        localStorage.removeItem('refresh')
        localStorage.removeItem('client_id')

        dispatch(setClearState())
    }
}

export const thunkUserData = clientId => async dispatch => {
    try {
        dispatch(setIsFetching(true))

        const responseClient = await axiosInstanceWithToken.get(
            `http://erp.apptrix.ru/api/clients/${clientId}/`
        )

        dispatch(setIsAuthorized(responseClient.data))
        dispatch(setIsFetching(false))
    } catch (error) {
        dispatch(
            setIsError({
                has: true,
                title: 'Ошибка получения данных',
                msg: messages[error.message] || error.message,
            })
        )
        dispatch(setIsFetching(false))
    }
}

export const setIsRegistered = isRegistered => {
    return {
        type: SET_IS_REGISTERED,
        isRegistered,
    }
}

export const setIsLogged = isLogged => {
    return {
        type: SET_IS_LOGGED,
        isLogged,
    }
}

export const setIsAuthorized = isAuthorized => {
    return {
        type: SET_IS_AUTHORIZED,
        isAuthorized,
    }
}

export const setClearState = () => {
    return {
        type: SET_CLEAR_STATE,
    }
}

export const setCliendId = id => {
    return {
        type: SET_CLIENT_ID,
        id,
    }
}

export const setIsFetching = isFetching => {
    return {
        type: SET_IS_FETCHING,
        isFetching,
    }
}

export const setIsError = isError => {
    return {
        type: SET_IS_ERROR,
        isError,
    }
}

export const setIsClearError = () => {
    return {
        type: SET_IS_CLEAR_ERROR,
    }
}

export const setIsClearRegistered = () => {
    return {
        type: SET_IS_CLEAR_REGISTERED,
    }
}
