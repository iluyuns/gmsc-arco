export interface httpResponse {
  message: string;
  status: number;
  data?: any;
  user?: any;
  list?: Array<any>;
  total?: number;
  token?: string;
}
// PageQuery is the query parameters for pagination
// Page     int      `form:"page" json:"page" binding:"required"`
// Limit    int      `form:"limit" json:"limit" binding:"required"`
// SortBy   []string `form:"sort_by" json:"sort_by"`
// SortDesc []bool   `form:"sort_desc" json:"sort_desc"`
