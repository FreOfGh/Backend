import {DefaultResponse} from '../../../../contexts/shared/domain/default.response';
import {ApiProperty} from '@nestjs/swagger';
import {PullCardAppResponse} from '../../../../contexts/player/application/pull-card/pull-card.app.response';

export class PullCardControllerResponse extends DefaultResponse {
    @ApiProperty({type: PullCardAppResponse}) data: PullCardAppResponse;
}