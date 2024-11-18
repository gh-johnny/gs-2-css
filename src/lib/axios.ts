import axios from 'axios'

export const api = axios.create({
    baseUrl: '', // api base (sendo localhost para json-server ou outro)
})