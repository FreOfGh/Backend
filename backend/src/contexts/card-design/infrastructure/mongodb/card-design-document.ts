import {DocumentBase} from '../../../shared/infrastructure/mongodb/document-base';
import {CardDesignDto} from '../../domain/card-design.dto';
import {Document, Schema} from 'mongoose';
import {SchemaDefinitionType} from '../../../shared/infrastructure/mongodb/schema-definition-type';

export type CardDesignDocument = CardDesign & Document;
type CardDesign = DocumentBase<CardDesignDto>;

const definition: SchemaDefinitionType<CardDesign> = {
    cardDesignId: {
        type: String,
        required: true,
        index: true,
        unique: true,
    },
    isDefault: {
        type: Boolean,
        required: true,
    },
    isActive: {
        type: Boolean,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    }
};

export const CardDesignSchema = new Schema(definition, {timestamps: false});