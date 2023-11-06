import {DefaultResponse} from '../../../../contexts/shared/domain/default.response';
import {ApiProperty} from '@nestjs/swagger';
import {BuildAccessInfoAppResponse} from '../../../../contexts/user/application/build/build-access-info.app.response';

export class LoginUserControllerResponse extends DefaultResponse {
    @ApiProperty({type: BuildAccessInfoAppResponse}) data: BuildAccessInfoAppResponse;
}