import {DocumentBase} from '../../../shared/infrastructure/mongodb/document-base';
import {MatchDto} from '../../domain/match.dto';
import {Document, Schema} from 'mongoose';
import {SchemaDefinitionType} from '../../../shared/infrastructure/mongodb/schema-definition-type';
import {CardSchema} from '../../../card/infrastructure/mongodb/card-document';

export type MatchDocument = Document & Match;
type Match = DocumentBase<MatchDto>;

const definition: SchemaDefinitionType<Match> = {
    cardsDeck: {
        type: [CardSchema],
        required: true,
    },
    currentPlayers: {
        type: Number,
        required: true,
    },
    currentPosition: {
        type: Number,
        required: true,
    },
    discardedCards: {
        type: [CardSchema],
        required: true,
    },
    gameId: {
        type: String,
        required: true,
        index: true,
    },
    matchId: {
        type: String,
        required: true,
        index: true,
        unique: true,
    },
    status: {
        type: String,
        required: true,
        index: true,
    },
    turn: {
        type: Number,
        required: true,
    }
};

export const MatchSchema = new Schema(definition, {timestamps: false});