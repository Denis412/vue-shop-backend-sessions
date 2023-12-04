import PaginatorOrderBy from 'src/types/orderBy';
import PaginatorWhere from 'src/types/where';

export default class Pagination {
  page: number;
  perPage: number;
  where?: PaginatorWhere;
  orderBy?: PaginatorOrderBy;
}
