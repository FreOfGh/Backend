import {GameId} from '../../game/domain/game-id';
import {MatchId} from './match-id';
import {MatchStatus} from './match-status';
import {MatchDto} from './match.dto';
import {Player} from '../../player/domain/player';
import {PlayerStatus} from '../../player/domain/player-status';
import {PlayerStatusConstants} from '../../player/domain/player-status.constants';
import {Card} from '../../card/domain/card';

export class Match {

    public readonly gameId: GameId;
    public readonly matchId: MatchId;
    public discardedCards: Array<Card>;
    public readonly currentPlayers: number;
    public turn: number;
    private readonly status: MatchStatus;
    private cardsDeck: Array<Card>;


    constructor(
        gameId: GameId,
        matchId: MatchId,
        currentPlayers: number,
        turn: number,
        status: MatchStatus,
        discardedCards: Array<Card>,
        cardsDeck: Array<Card>,
    ) {
        this.gameId = gameId;
        this.matchId = matchId;
        this.currentPlayers = currentPlayers;
        this.turn = turn;
        this.status = status;
        this.discardedCards = discardedCards;
        this.cardsDeck = cardsDeck;
    }

    public static fromPrimitives(payload: MatchDto): Match {
        return new Match(
            new GameId(payload.gameId),
            new MatchId(payload.matchId),
            payload.currentPlayers,
            payload.turn,
            new MatchStatus(payload.status),
            payload.discardedCards.map(Card.fromPrimitives),
            payload.cardsDeck.map(Card.fromPrimitives),
        );
    }

    public createTurns(): Array<number> {
        return Array.from({length: this.currentPlayers}, (_, i) => i + 1);
    }

    public selectTurn(turns: Array<number>, player: Player): void {
        const random: number = Math.floor(Math.random() * turns.length);
        player.position = turns[random];
        if (player.position == 1) player.status = new PlayerStatus(PlayerStatusConstants.IN_TURN);
        else player.status = new PlayerStatus(PlayerStatusConstants.WAITING_TURN);
    }

    public dealCards(player: Player): void {
        const requiredCards: number = player.position == 1 ? 11 : 10;
        for (let i = 0; i < requiredCards; i++) {
            const random: number = Math.floor(Math.random() * this.cardsDeck.length);
            if (i < 3) player.terna1.push(this.cardsDeck[random]);
            else if (i < 6) player.terna2.push(this.cardsDeck[random]);
            else if (i < 10) player.cuarta.push(this.cardsDeck[random]);
            else player.sobrante = this.cardsDeck[random];
            this.cardsDeck.splice(random, 1);
        }
    }

    public pullFromDesk(player: Player): void {
        if (this.cardsDeck.length == 0) this.recoverCardsFromDiscarded();
        const random: number = Math.floor(Math.random() * this.cardsDeck.length);
        player.sobrante = this.cardsDeck[random];
        this.cardsDeck.splice(random, 1);
    }

    public toPrimitives(): MatchDto {
        return {
            cardsDeck: this.cardsDeck.map(c => c.toPrimitives()),
            currentPlayers: this.currentPlayers,
            discardedCards: this.discardedCards.map(c => c.toPrimitives()),
            gameId: this.gameId.toString(),
            matchId: this.matchId.toString(),
            status: this.status.toString(),
            turn: this.turn,
        };
    }

    private recoverCardsFromDiscarded(): void {
        const last: Card = this.discardedCards.pop();
        this.cardsDeck = [...this.discardedCards];
        this.discardedCards = [last];
    }
}