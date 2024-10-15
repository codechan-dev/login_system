import { User } from './user.entity';
import { Repository } from 'typeorm';
export declare class UserService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    register(username: string, password: string): Promise<User>;
    findOne(username: string): Promise<User | undefined>;
    findAll(): Promise<User[]>;
}
