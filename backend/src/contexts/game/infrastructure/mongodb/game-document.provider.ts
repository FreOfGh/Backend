import {FactoryProvider} from '@nestjs/common';
import {MongodbConstants} from '../../../shared/infrastructure/mongodb/mongodb.constants';
import {Connection} from 'mongoose';
import {GameSchema} from './game-document';

export const GameDocumentProvider: FactoryProvider = {
    inject: [MongodbConstants.DATABASE_CONNECTION],
    provide: MongodbConstants.GAME_DOCUMENT,
    useFactory(connection: Connection) {
        return connection.model(MongodbConstants.GAME_COLLECTION_NAME, GameSchema);
    }
};