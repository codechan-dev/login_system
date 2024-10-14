"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeOrmConfig = void 0;
const user_entity_1 = require("../users/user.entity");
const dotenv = require("dotenv");
dotenv.config();
exports.typeOrmConfig = {
    type: 'mysql',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT, 10) || 3306,
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'auth_db',
    entities: [user_entity_1.User],
    synchronize: true,
};
//# sourceMappingURL=typeorm.config.js.map