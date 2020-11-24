import {
    SET_CLEAR_STATE,
    SET_IS_CLEAR_ERROR,
    SET_IS_CLEAR_REGISTERED,
    SET_IS_AUTHORIZED,
    SET_IS_ERROR,
    SET_IS_FETCHING,
    SET_IS_LOGGED,
    SET_IS_REGISTERED,
} from '../actions/jwtActions'

const initialState = {
    isRegistered: { has: false, title: '', msg: '' },
    isLogged: null,
    isAuthorized: null,
    isFetching: false,
    isError: { has: false, title: '', msg: '' },
}

export function jwtReducer(state = initialState, action) {
    switch (action.type) {
        case SET_IS_REGISTERED:
            return {
                ...state,
                isRegistered: { ...state.isRegistered, ...action.isRegistered },
            }
        case SET_IS_LOGGED:
            return {
                ...state,
                isLogged: action.isLogged,
            }

        case SET_IS_AUTHORIZED:
            return {
                ...state,
                isAuthorized: { ...action.isAuthorized },
            }

        case SET_CLEAR_STATE:
            return {
                ...state,
                isLogged: null,
                isAuthorized: null,
                isFetching: false,
            }

        case SET_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching,
            }

        case SET_IS_ERROR:
            return {
                ...state,
                isError: { ...state.isError, ...action.isError },
            }
        case SET_IS_CLEAR_ERROR:
            return {
                ...state,
                isError: { ...state.isError, has: false, title: '', msg: '' },
            }
        case SET_IS_CLEAR_REGISTERED:
            return {
                ...state,
                isRegistered: {
                    ...state.isRegistered,
                    has: false,
                    title: '',
                    msg: '',
                },
            }

        default:
            return state
    }
}
