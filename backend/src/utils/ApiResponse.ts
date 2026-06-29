
export class ApiResponse<T>{
    constructor(
       public statusCode : number,
       public data : T,
       public  message : string,
       public success = true
    ) {
        this.data = data
        this.message = message
        this.statusCode = statusCode
        this.success = statusCode < 500
    }
}
