export interface Login {
  email: string;
  password: string;
}

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  name: string;
  avatar?: string;
}

export interface Signup {
  name: string;
  email: string;
  password: string;
  re_password: string;
}

export interface ResetPassword {
  email: string;
}

export interface ResetPasswordConfirm {
  uid: string;
  token: string;
  new_password: string;
  re_new_password: string;
}

export interface authState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  success: boolean;
}

// Language interface
export interface Language {
  id: number;
  name: string;
  // created_at: string; // ISO string date
  // updated_at: string;
}

// CheatSheet interface
export interface CheatSheet {
  id: number;
  title: string;
  description?: string;
  user: User;
  language: Language;
  created_at: string;
  updated_at: string;
  snippets?: Snippet[];
  favorites_count?: number;
  tags: Tag[]; // Add tags to CheatSheet interface
}

// Tag interface
export interface Tag {
  id: number;
  name: string;
}

// Snippet interface
export interface Snippet {
  title: string;
  content: string;
  explanation?: string;
  user?: User;
  cheat_sheet?: CheatSheet;
  tags: Tag[];
  // created_at: string;
  // updated_at: string;
}

// FavoriteLike interface
export interface FavoriteLike {
  id: number;
  user: User;
  cheat_sheet: CheatSheet;
  // created_at: string;
  // updated_at: string;
}
