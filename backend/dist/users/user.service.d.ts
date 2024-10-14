import { Repository } from 'typeorm';
import { User } from './user.entity';
export declare class UsersService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    findOne(username: string): Promise<User | undefined>;
    findAll(): Promise<User[]>;
    create(user: Partial<User>): Promise<User>;
}
