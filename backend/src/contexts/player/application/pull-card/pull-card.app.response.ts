import {ApiProperty} from '@nestjs/swagger';
import {PlayerDto} from '../../domain/player.dto';
import {MatchDto} from '../../../match/domain/match.dto';

export class PullCardAppResponse {
    @ApiProperty({type: PlayerDto}) player: PlayerDto;
    @ApiProperty({type: MatchDto}) match: MatchDto;
}