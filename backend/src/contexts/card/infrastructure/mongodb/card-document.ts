import {DocumentBase} from '../../../shared/infrastructure/mongodb/document-base';
import {CardDto} from '../../domain/card.dto';
import {SchemaDefinitionType} from '../../../shared/infrastructure/mongodb/schema-definition-type';
import {Schema} from 'mongoose';

type Card = DocumentBase<CardDto>;

const definition: SchemaDefinitionType<Card> = {
    symbol: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
};

export const CardSchema = new Schema(definition, {timestamps: false, _id: false});