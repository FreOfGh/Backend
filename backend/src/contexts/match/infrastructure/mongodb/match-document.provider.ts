import {FactoryProvider} from '@nestjs/common';
import {MongodbConstants} from '../../../shared/infrastructure/mongodb/mongodb.constants';
import {Connection} from 'mongoose';
import {MatchSchema} from './match-document';

export const MatchDocumentProvider: FactoryProvider = {
    inject: [MongodbConstants.DATABASE_CONNECTION],
    provide: MongodbConstants.MATCH_DOCUMENT,
    useFactory(connection: Connection) {
        return connection.model(MongodbConstants.MATCH_COLLECTION_NAME, MatchSchema);
    }
};