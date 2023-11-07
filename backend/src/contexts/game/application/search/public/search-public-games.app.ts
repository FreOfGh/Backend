import {Logger} from '@nestjs/common';
import {Game} from '../../../domain/game';
import {IGameRepository} from '../../../domain/i-game.repository';

export class SearchPublicGamesApp {

    private readonly logger: Logger = new Logger(SearchPublicGamesApp.name);

    constructor(private readonly repository: IGameRepository) {
    }

    exec(): Promise<Array<Game>> {
        return this.repository.findPublic();
    }
}