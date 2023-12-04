import { PaginatorWhereOperator } from './paginator-where-operator';

export default class PaginatorWhere {
  column?: string;
  operator?: PaginatorWhereOperator;
  value?: string;
  or?: PaginatorWhere[];
  and?: PaginatorWhere[];
}
