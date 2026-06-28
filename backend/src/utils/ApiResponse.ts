
export class ApiResponse{
        statusCode : number
        data? :object
        message : string
        success : boolean
    constructor(
        statusCode : number,
        data : object ,
        message : string,
        success = true
    ) {
        this.data = data
        this.message = message
        this.statusCode = statusCode
        this.success = statusCode < 500
    }
}
