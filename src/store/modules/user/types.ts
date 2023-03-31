export type RoleType = '' | '*' | 'admin' | 'user';
export interface UserState {
  id: number;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  username: string;
  name: string;
  phone: string;
  uuid: string;
  open_id: string;
  union_id: string;
  app_id: string;
  grade_id: number;
  grade: {
    id: number;
    created_at: string;
    updated_at: string;
    deleted_at: string;
    level: number;
    name: string;
  };
  user_role: [
    {
      id: number;
      created_at: string;
      updated_at: string;
      deleted_at: string;
      user_id: number;
      role_id: number;
      role: {
        id: number;
        created_at: string;
        updated_at: string;
        deleted_at: string;
        name: string;
        description: string;
      };
    }
  ];
  identity_card_type: number;
  identity_card_no: string;
  nick_name: string;
  avatar_url: string;
  available_balance: string;
  birthday: string;
  empiric_value: string;
  freeze_balance: string;
  income_cash: string;
  is_easy_business: boolean;
  parent_id: number;
  point: string;
}
