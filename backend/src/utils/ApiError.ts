
export class ApiError extends Error{
        statusCode : number
        error? : []
        message : string
        success : boolean
    constructor(
        statusCode : number,
        message : string,
        error? : [] ,
        success = false
    ) {
        super(message)
        this.statusCode = statusCode
        this.message = message
        this.success = statusCode < 500

        if(error) {
            this.error = error
        }
    }
}