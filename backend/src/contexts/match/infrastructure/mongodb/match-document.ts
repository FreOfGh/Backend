import {DocumentBase} from '../../../shared/infrastructure/mongodb/document-base';
import {MatchDto} from '../../domain/match.dto';
import {Document, Schema} from 'mongoose';
import {SchemaDefinitionType} from '../../../shared/infrastructure/mongodb/schema-definition-type';

export type MatchDocument = Document & Match;
type Match = DocumentBase<MatchDto>;

const definition: SchemaDefinitionType<Match> = {
    currentPosition: {
        type: Number,
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
};

export const MatchSchema = new Schema(definition, {timestamps: false});