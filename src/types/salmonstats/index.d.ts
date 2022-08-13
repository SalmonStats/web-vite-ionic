export type Player = {
  /** プレイヤーID */
  nsaid: string;
  /** プレイヤー名 */
  nickname: string;
  /** サムネイルURL */
  thumbnail_url: string;
  /** バイト回数 */
  shifts_worked: number;
  /** クリア回数 */
  is_clear: number;
  /** 失敗回数 */
  is_failure: number;
  /** 認証済みかどうか */
  is_verified: boolean;
  /** フレンドコードが公開設定かどうか */
  is_friend_code_public: boolean;
  /** TwitterIDが公開設定かどうか */
  is_twitter_id_public: boolean;
  /** 特待生どうか */
  is_imperial_scholars: boolean;
  /** 総合金イクラ納品数 */
  golden_ikura_num: number;
  /** 総合イクラ獲得数 */
  ikura_num: number;
  /** 総合クマサンポイント獲得数 */
  kuma_point: number;
  /** 最高評価 */
  grade_point: number;
  /** ステージごとの最高納品数記録 */
  stage_results: Results[];
};

export type Results = {
  /** ステージID */
  stage_id: number;
  /** 夜記録 */
  night: Result;
  /** 昼記録 */
  nightless: Result;
};

export type Result = {
  /** ステージID */
  stage_id: number;
  /** 夜イベントを含むかどうか */
  nightless: boolean;
  /** 最高評価 */
  grade_point_max: number;
  /** バイト回数 */
  shifts_worked: number;
  /** 合計クマサンポイント獲得数 */
  kuma_point_total: number;
  /** 個人記録 */
  player_results: Record;
  /** チーム記録 */
  team_results: Record;
};

export type Record = {
  /** 金イクラ納品数 */
  golden_ikura_num: number;
  /** イクラ獲得数 */
  ikura_num: number;
};

export type TotalRank = {
  /** 金イクラ納品数 */
  golden_ikura_num: number;
  /** 順位 */
  rank: number;
  /** メンバーIDリスト */
  members: string[];
  /** プレイヤー名リスト */
  names: string[];
};
