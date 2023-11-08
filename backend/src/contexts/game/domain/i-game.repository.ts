import {Game} from './game';
import {GameCode} from './game-code';

export interface IGameRepository {

    findByCode(code: GameCode): Promise<Game>;

    findPublic(): Promise<Array<Game>>;

    create(game: Game): Promise<Game>;
}