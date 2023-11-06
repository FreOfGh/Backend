import { FactoryProvider } from '@nestjs/common';
import { MongodbConstants } from './mongodb.constants';
import { Connection, createConnection } from 'mongoose';

export const MongodbConnectionProvider: FactoryProvider = {
    provide: MongodbConstants.DATABASE_CONNECTION,
    useFactory: async (): Promise<Connection> => {
        return createConnection(process.env.MONGODB_URI);
    }
};