import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongodbConnectionModule } from '../../contexts/shared/infrastructure/mongodb/mongodb-connection.module';

@Module({
    imports: [
        CqrsModule,
        MongodbConnectionModule,
    ],
    exports: [
        CqrsModule,
        MongodbConnectionModule,
    ],
})
export class SharedModule {
}