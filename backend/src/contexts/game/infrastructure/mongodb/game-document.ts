import {DocumentBase} from '../../../shared/infrastructure/mongodb/document-base';
import {GameDto} from '../../domain/game.dto';
import {Document, Schema} from 'mongoose';
import {SchemaDefinitionType} from '../../../shared/infrastructure/mongodb/schema-definition-type';

export type GameDocument = Game & Document;
type Game = DocumentBase<GameDto>;

const definition: SchemaDefinitionType<Game> = {
    code: {
        type: String,
        required: true,
        index: true,
    },
    creatorId: {
        type: String,
        required: true,
    },
    gameId: {
        type: String,
        required: true,
        index: true,
        unique: true,
    },
    isPublic: {
        type: Boolean,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    requiredPlayers: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        required: true,
        index: true,
    },
    totalBet: {
        type: Number,
        required: true,
    },
    totalPlayers: {
        type: Number,
        required: true,
    }
};

export const GameSchema = new Schema(definition as Record<string, unknown>, {timestamps: true});