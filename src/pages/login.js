import React from 'react'
import { useDispatch } from 'react-redux'
import Auth from '../components/auth'
import { thunkLogin } from '../store/actions/jwtActions'

const Login = () => {
    const dispatch = useDispatch()

    const onSubmit = data => {
        const payload = {
            'username': data.email,
            'password': data.password,
        }

        dispatch(thunkLogin(payload))
    }

    return (
        <Auth
            onSubmit={onSubmit}
            title={'Авторизация'}
            btnText={'Войти'}
            redirectText={'Еще не зарегистрированы?'}
            redirectLink={'/singup'}
        />
    )
}

export default Login
