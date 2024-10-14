import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(body: {
        username: string;
        password: string;
    }): Promise<{
        id: number;
        username: string;
    }>;
    login(body: {
        username: string;
        password: string;
    }): Promise<{
        access_token: string;
    }>;
}
