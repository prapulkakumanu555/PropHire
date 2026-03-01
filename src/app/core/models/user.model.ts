export type Role = 'CLIENT' | 'ACCOUNT_MANAGER';

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
  img?: string;
}
