import {DefaultResponse} from '../../../../contexts/shared/domain/default.response';
import {ApiProperty} from '@nestjs/swagger';
import {GameDto} from '../../../../contexts/game/domain/game.dto';

export class CreateGameControllerResponse extends DefaultResponse {
    @ApiProperty({type: GameDto}) data: GameDto;
}