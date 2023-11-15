type ErrorResponse = {
    response: {
        data: {
            code: number;
            message: string;
            success: boolean;
        }
    }
}