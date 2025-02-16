// src/utils/AppResponse.ts
import { Response } from 'express';

export class ApiResponse {
    public status: string;
    public message?: string;
    public data?: any;

    constructor(message?: string, data?: any) {
        this.status = 'success';
        this.message = message;
        this.data = data;
    }

    static send(res: Response, statusCode: number, message?: string, data?: any) {
        res.status(statusCode).json(new ApiResponse(message, data));
    }
}
