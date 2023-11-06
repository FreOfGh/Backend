import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {UserModule} from './apps/user/user.module';
import {GameModule} from './apps/game/game.module';

@Module({
    imports: [
        ConfigModule.forRoot({isGlobal: true}),
        UserModule,
        GameModule,
    ]
})
export class AppModule {
}
