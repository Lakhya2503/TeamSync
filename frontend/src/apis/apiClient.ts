import axios from 'axios'

const baseUrl : string = import.meta.env.VITE_API_BASE_URL || "http://localhost:5002/api/v1/teamsync"

export const apiClient = axios.create({
    baseURL : baseUrl,
    withCredentials : true,
    timeout : 30000,
    headers : {
        'content-type' : 'application/json'
    }
})