import {FactoryProvider} from '@nestjs/common';
import {MongodbConstants} from '../../../shared/infrastructure/mongodb/mongodb.constants';
import {Connection} from 'mongoose';
import {UserSchema} from './user-document';

export const UserDocumentProvider: FactoryProvider = {
    inject: [MongodbConstants.DATABASE_CONNECTION],
    provide: MongodbConstants.USER_DOCUMENT,
    useFactory(connection: Connection) {
        return connection.model(MongodbConstants.USER_COLLECTION_NAME, UserSchema);
    }
};