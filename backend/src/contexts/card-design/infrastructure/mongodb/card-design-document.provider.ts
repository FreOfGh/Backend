import {FactoryProvider} from '@nestjs/common';
import {MongodbConstants} from '../../../shared/infrastructure/mongodb/mongodb.constants';
import {Connection} from 'mongoose';
import {CardDesignSchema} from './card-design-document';

export const CardDesignDocumentProvider: FactoryProvider = {
    inject: [MongodbConstants.DATABASE_CONNECTION],
    provide: MongodbConstants.CARD_DESIGN_DOCUMENT,
    useFactory(connection: Connection) {
        return connection.model(MongodbConstants.CARD_DESIGN_COLLECTION_NAME, CardDesignSchema);
    }
};