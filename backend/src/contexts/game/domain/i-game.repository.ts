import {Game} from './game';

export interface IGameRepository {

    findPublic(): Promise<Array<Game>>;

    create(game: Game): Promise<Game>;
}