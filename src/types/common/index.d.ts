interface Paginated<T> {
  limit: number;
  offset: number;
  results: T[];
}
