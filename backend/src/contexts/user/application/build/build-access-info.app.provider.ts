import {FactoryProvider} from '@nestjs/common';
import {BuildAccessInfoApp} from './build-access-info.app';
import {JwtService} from '@nestjs/jwt';
import {IJwt} from '../../../shared/domain/i-jwt';

export const BuildAccessInfoAppProvider: FactoryProvider<BuildAccessInfoApp> = {
    inject: [JwtService],
    provide: BuildAccessInfoApp,
    useFactory(jwt: IJwt): BuildAccessInfoApp {
        return new BuildAccessInfoApp(jwt);
    }
};