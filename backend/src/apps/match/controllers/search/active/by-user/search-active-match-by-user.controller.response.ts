import {DefaultResponse} from '../../../../../../contexts/shared/domain/default.response';
import {ApiProperty} from '@nestjs/swagger';
import {MatchDto} from '../../../../../../contexts/match/domain/match.dto';

export class SearchActiveMatchByUserControllerResponse extends DefaultResponse {
    @ApiProperty({type: MatchDto}) data: MatchDto;
}