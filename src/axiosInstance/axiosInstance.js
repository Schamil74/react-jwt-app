import axios from 'axios'

export const axiosInstance = axios.create({
    baseURL: 'http://erp.apptrix.ru/api/clients/',
    headers: {
        'Content-Type': 'application/json',
    },
})

export const axiosInstanceWithToken = axios.create({
    baseURL: 'http://erp.apptrix.ru/api/clients/',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access')}`,
    },
})

axiosInstanceWithToken.interceptors.response.use(
    response => {
        return response
    },
    async error => {
        let originalRequest = error.config
        const refreshToken = localStorage.getItem('refresh')

        if (error.response.status === 403 && refreshToken) {
            originalRequest.headers[
                'Authorization'
            ] = `Bearer ${localStorage.getItem('access')}`

            return axiosInstanceWithToken(originalRequest)
        }

        if (
            error.response.status === 401 &&
            refreshToken &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true

            if (refreshToken) {
                const responseRefreshToken = await axiosInstance.post(
                    'token/refresh/',
                    { 'refresh': refreshToken }
                )

                localStorage.setItem('access', responseRefreshToken.data.access)

                originalRequest.headers[
                    'Authorization'
                ] = `Bearer ${responseRefreshToken.data.access}`

                return axiosInstanceWithToken(originalRequest)
            }
        }

        return Promise.reject(error)
    }
)
