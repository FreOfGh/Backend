import {DefaultResponse} from '../../../../../contexts/shared/domain/default.response';
import {ApiProperty} from '@nestjs/swagger';
import {CardDesignDto} from '../../../../../contexts/card-design/domain/card-design.dto';

export class SearchActiveCardDesignsControllerResponse extends DefaultResponse {
    @ApiProperty({type: [CardDesignDto]}) data: Array<CardDesignDto>;
}