import {Module} from '@nestjs/common';
import {CqrsModule} from '@nestjs/cqrs';
import {MongodbConnectionModule} from '../../contexts/shared/infrastructure/mongodb/mongodb-connection.module';
import {ConfigModule} from '@nestjs/config';
import {JwtStrategy} from '../../contexts/user/infrastructure/passport/jwt.strategy';

@Module({
    imports: [
        ConfigModule.forRoot(),
        CqrsModule,
        MongodbConnectionModule,
    ],
    providers: [JwtStrategy],
    exports: [
        ConfigModule,
        CqrsModule,
        MongodbConnectionModule,
        JwtStrategy
    ],
})
export class SharedModule {
}