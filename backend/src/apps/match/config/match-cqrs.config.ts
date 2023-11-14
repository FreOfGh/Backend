import {
    SearchActiveMatchByUserQueryHandler
} from '../../../contexts/match/application/search/active/by-user/search-active-match-by-user.query-handler';

const QueryHandlers = [
    SearchActiveMatchByUserQueryHandler,
];
export const MatchCqrsConfig = [
    ...QueryHandlers,
];