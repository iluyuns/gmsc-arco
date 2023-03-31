export interface PageQuery {
  page?: number;
  limit?: number;
  sort_by?: Array<string>;
  sort_desc?: Array<boolean>;
}
