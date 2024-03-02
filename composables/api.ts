import axios from 'axios'

export const useApi = () => {
    const baseURL = 'http://localhost:8000'
    const token = localStorage.getItem('access-token') || ''

    const headers = {}

    if (token) {
        headers.Authorization = `Token ${token}`
    }

    return axios.create({
        baseURL,
        headers
    })
}