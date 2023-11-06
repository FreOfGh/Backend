import {Module} from '@nestjs/common';
import {CqrsModule} from '@nestjs/cqrs';
import {MongodbConnectionModule} from '../../contexts/shared/infrastructure/mongodb/mongodb-connection.module';
import {ConfigModule} from '@nestjs/config';

@Module({
    imports: [
        ConfigModule.forRoot(),
        CqrsModule,
        MongodbConnectionModule,
    ],
    exports: [
        ConfigModule,
        CqrsModule,
        MongodbConnectionModule,
    ],
})
export class SharedModule {
}