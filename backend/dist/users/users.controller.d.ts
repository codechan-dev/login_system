import { UsersService } from './user.service';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    getUsers(): Promise<{
        id: number;
        username: string;
    }[]>;
}
