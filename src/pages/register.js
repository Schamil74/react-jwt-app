import React from 'react'
import { useDispatch } from 'react-redux'
import { thunkRegister } from '../store/actions/jwtActions'
import Auth from '../components/auth'

const Register = () => {
    const dispatch = useDispatch()

    const onSubmit = data => {
        const payload = {
            'user': {
                'email': data.email,
                'password': data.password,
            },
            'phone': '',
            'invited_by': 'RU-637164',
            'name': data.email + '_name',
            'surname': data.email + '_surname',
            'country_key': 'RU',
        }

        dispatch(thunkRegister(payload))
    }

    return (
        <Auth
            onSubmit={onSubmit}
            title={'Регистрация'}
            btnText={'Зарегистрироваться'}
            redirectText={'Уже зарегистрированы?'}
            redirectLink={'/login'}
        />
    )
}

export default Register
