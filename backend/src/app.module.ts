import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {UserModule} from './apps/user/user.module';
import {GameModule} from './apps/game/game.module';
import {PlayerModule} from './apps/player/player.module';
import {CardDesignModule} from './apps/card-design/card-design.module';

@Module({
    imports: [
        ConfigModule.forRoot({isGlobal: true}),
        UserModule,
        GameModule,
        PlayerModule,
        CardDesignModule,
    ]
})
export class AppModule {
}
