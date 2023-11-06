import {Logger} from '@nestjs/common';
import {IJwt} from '../../../shared/domain/i-jwt';
import {UserDto} from '../../domain/user.dto';
import {BuildAccessInfoAppResponse} from './build-access-info.app.response';
import {mapFromUser} from '../../domain/user.decorator';

export class BuildAccessInfoApp {

    private readonly logger: Logger = new Logger(BuildAccessInfoApp.name);

    constructor(private readonly jwt: IJwt) {
    }

    public async exec(user: UserDto): Promise<BuildAccessInfoAppResponse> {
        this.logger.log(`[${this.exec.name}] INIT :: Building: ${JSON.stringify(user)}`);
        const response: BuildAccessInfoAppResponse = {user: user, token: this.jwt.sign(mapFromUser(user))};
        this.logger.log(`[${this.exec.name}] FINISH ::`);
        return response;
    }
}