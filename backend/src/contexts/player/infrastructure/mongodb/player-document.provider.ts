import {FactoryProvider} from '@nestjs/common';
import {MongodbConstants} from '../../../shared/infrastructure/mongodb/mongodb.constants';
import {Connection} from 'mongoose';
import {PlayerSchema} from './player-document';

export const PlayerDocumentProvider: FactoryProvider = {
    inject: [MongodbConstants.DATABASE_CONNECTION],
    provide: MongodbConstants.PLAYER_DOCUMENT,
    useFactory(connection: Connection) {
        return connection.model(MongodbConstants.PLAYER_COLLECTION_NAME, PlayerSchema);
    },
};