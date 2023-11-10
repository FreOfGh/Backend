import {Game} from './game';
import {GameCode} from './game-code';
import {GameId} from './game-id';

export interface IGameRepository {

    findById(gameId: GameId): Promise<Game>;

    findByCode(code: GameCode): Promise<Game>;

    findPublic(): Promise<Array<Game>>;

    create(game: Game): Promise<Game>;

    update(game: Game): Promise<Game>;
}