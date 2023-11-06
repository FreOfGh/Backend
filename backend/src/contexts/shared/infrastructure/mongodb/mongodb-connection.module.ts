import { Module } from '@nestjs/common';
import { MongodbConnectionProvider } from './mongodb-connection.provider';

@Module({
    providers: [MongodbConnectionProvider],
    exports: [MongodbConnectionProvider]
})
export class MongodbConnectionModule {
}