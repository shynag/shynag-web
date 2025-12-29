// Type Primitif Global
export type ID = string;
export type Slug = string;
export type ISODate = string;

// Interface Generik Dasar
export interface BaseEntity {
  id: ID;
  createdAt?: ISODate;
  updatedAt?: ISODate;
}

export interface PaginationResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}
