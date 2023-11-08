import {
    SearchActiveCardDesignsQueryHandler
} from '../../../contexts/card-design/application/search/active/search-active-card-designs.query-handler';

const QueryHandlers = [
    SearchActiveCardDesignsQueryHandler,
];

export const CardDesignCqrsConfig = [
    ...QueryHandlers,
];