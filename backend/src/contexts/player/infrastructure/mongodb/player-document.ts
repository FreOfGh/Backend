import {DocumentBase} from '../../../shared/infrastructure/mongodb/document-base';
import {PlayerDto} from '../../domain/player.dto';
import {Document, Schema} from 'mongoose';
import {SchemaDefinitionType} from '../../../shared/infrastructure/mongodb/schema-definition-type';
import {CardSchema} from '../../../card/infrastructure/mongodb/card-document';

export type PlayerDocument = Player & Document;
type Player = DocumentBase<PlayerDto>;

const definition: SchemaDefinitionType<Player> = {
    cuarta: {
        type: [CardSchema],
        required: true,
    },
    gameId: {
        type: String,
        required: true,
        index: true,
    },
    playerId: {
        type: String,
        required: true,
        index: true,
        unique: true,
    },
    position: {
        type: Number,
        required: true,
    },
    score: {
        type: Number,
        required: true,
    },
    sobrante: {
        type: CardSchema,
        required: false,
    },
    status: {
        type: String,
        required: true,
    },
    terna1: {
        type: [CardSchema],
        required: true,
    },
    terna2: {
        type: [CardSchema],
        required: true,
    },
    userId: {
        type: String,
        required: true,
        index: true,
    },
    username: {
        type: String,
        required: true,
    },
    userIcon: {
        type: String,
        required: true,
    },
    userDesign: {
        type: String,
        required: true,
    }
};

export const PlayerSchema = new Schema(definition);