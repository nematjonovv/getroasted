export interface IStatsResponse {
  success: boolean;
  message: string;
  data: {
    users: {
      total: number;
      byRole: Record<UserRole, number>;
    };
    portfolios: {
      total: number;
    };
    roasts: {
      total: number;
    };
  };
}

export type UserRole = "USER" | "ADMIN" | "SUPERADMIN";