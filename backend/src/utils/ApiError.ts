
export class ApiError extends Error{
        statusCode : number
        error? : []
        message : string
        success : boolean 
    constructor(
        statusCode : number,
        message : string,
        error? : [] ,
        success? :boolean 
    ) {
        super(message)
        this.statusCode = statusCode
        this.message = message
        this.success = success ? success : false

        if(error) {
            this.error = error
        }
    }
}