export interface User {
  id: number;
  fullName: string;
  username: string;
}

export interface UserState {
  user: User | null;
  isSignUpLoading: boolean;
  isLoginLoading: boolean;
  signUpError: string | null;
  loginError: string | null;
  signUpSuccess: string | null;
  loginSuccess: string | null;
}
