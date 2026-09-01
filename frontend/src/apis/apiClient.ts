import ky from 'ky'
import type { ApiResponseType } from '../types/ResponseType'

export const baseUrl : string = import.meta.env.VITE_API_BASE_URL || "http://localhost:5002/api/v1/teamsync"

export const apiClient = ky.create(
    {
        prefix : baseUrl,
        fetch : async(request: Request,init : RequestInit) => {
            const start = performance.now()
            const response = await fetch(request, init)
            const duration = performance.now() - start
            console.log("start", start)
            console.log("response", response)
            console.log("duration", duration)
            console.log("request", request)
            console.log(`response : ${request.method} || ${request.url} - ${response.status} (${Math.round(duration)}ms)`);
            return response
        }
    }
)