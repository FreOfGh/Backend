import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {UserModule} from './apps/user/user.module';

@Module({
    imports: [
        ConfigModule.forRoot({isGlobal: true}),
        UserModule,
    ]
})
export class AppModule {
}
