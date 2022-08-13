type Paginated<T> = {
  limit: number;
  offset: number;
  results: T[];
};

export type APIError = {
  error: string;
  error_description: string;
  errorMessage: string;
};

export type SplatNet2 = {
  nickname: string;
  nsaid: string;
  session_token: string;
  iksm_session: string;
  thumbnail_url: string;
  expires_in: number;
  friend_code: string;
  summary: CoopSummary;
};

export type CoopSummary = {
  golden_ikura_total: number;
  ikura_total: number;
  help_total: number;
  job_num: number;
  kuma_point: number;
  kuma_point_total: number;
};

export interface Parameters {
  limit: number;
  sort: SortType;
  order: OrderType;
  nightless: boolean;
  golden_ikura_num: number;
  ikura_num: number;
  is_clear: boolean;
}
