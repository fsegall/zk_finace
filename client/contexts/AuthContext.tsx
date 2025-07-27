import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase } from '@/lib/supabase/client';
import type { Session, User } from '@supabase/supabase-js';
import type { Database } from '../../shared/supabase/types';

// Mock data for development
const MOCK_USER = {
  id: 'mock-user-id',
  email: 'dev@zkfinance.com',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  email_confirmed_at: new Date().toISOString(),
  last_sign_in_at: new Date().toISOString(),
  role: 'authenticated',
  aud: 'authenticated',
  app_metadata: {},
  user_metadata: { full_name: 'Developer User' },
  identities: [],
  factors: [],
  phone: null,
  phone_confirmed_at: null,
  confirmation_sent_at: null,
  recovery_sent_at: null,
  email_change_sent_at: null,
  new_email: null,
  invited_at: null,
  action_link: null,
  is_sso_user: false,
  confirmed_at: new Date().toISOString(),
  is_anonymous: false,
} as User;

const MOCK_PROFILE: Database['public']['Tables']['profiles']['Row'] = {
  id: 'mock-user-id',
  full_name: 'Developer User',
  avatar_url: null,
  updated_at: new Date().toISOString(),
  is_onboarded: true,
  role_selection: 'borrower',
  wallet_address: '0x1234567890123456789012345678901234567890'
};

// Check if we're in development mode
const isDevelopment = import.meta.env.DEV && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

// Tipos para perfil e roles
export type Profile = Database['public']['Tables']['profiles']['Row'];
export type AppRole = Database['public']['Enums']['app_role'];

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  roles: AppRole[];
  loading: boolean;
  loginWithGoogle: () => Promise<void>;
  loginWithPassword: (email: string, password: string) => Promise<void>;
  signupWithPassword: (email: string, password: string, fullName: string) => Promise<void>;
  logout: () => Promise<void>;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [roles, setRoles] = useState<AppRole[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load initial session
  useEffect(() => {
    // Always use real Supabase auth for initial session
    const currentSession = supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setUser(data.session?.user ?? null);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
    });
    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

      // Load profile and roles when user changes
  useEffect(() => {
    if (!user) {
      setProfile(null);
      setRoles([]);
      setLoading(false);
      return;
    }

    if (isDevelopment && user.id === 'mock-user-id') {
      // In development with mock user, use mock data
      setProfile(MOCK_PROFILE);
      setRoles(['borrower']);
      setLoading(false);
      return;
    }

    setLoading(true);
    Promise.all([
      supabase.from('profiles').select('*').eq('id', user.id).single(),
      supabase.rpc('get_user_roles', { _user_id: user.id })
    ])
      .then(([profileRes, rolesRes]) => {
        setProfile(profileRes.data ?? null);
        setRoles(rolesRes.data ?? []);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [user]);

      // Login/logout methods
  const loginWithGoogle = async () => {
    setError(null);
    if (isDevelopment) {
      console.log('🔧 Development mode: Mock Google login');
      setUser(MOCK_USER);
      setProfile(MOCK_PROFILE);
      setRoles(['borrower']);
      return;
    }
    const { error } = await supabase.auth.signInWithOAuth({ provider: 'google' });
    if (error) setError(error.message);
  };

  const loginWithPassword = async (email: string, password: string) => {
    setError(null);
    if (isDevelopment) {
      console.log('🔧 Development mode: Mock password login with:', email);
      // Simulate a small delay to make it feel more realistic
      await new Promise(resolve => setTimeout(resolve, 500));
      setUser(MOCK_USER);
      setProfile(MOCK_PROFILE);
      setRoles(['borrower']);
      return;
    }
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError(error.message);
  };

  // Cadastro com email/senha
  const signupWithPassword = async (email: string, password: string, fullName: string) => {
    setError(null);
    if (isDevelopment) {
      console.log('🔧 Development mode: Mock signup with:', email, fullName);
      // Simulate a small delay to make it feel more realistic
      await new Promise(resolve => setTimeout(resolve, 800));
      setUser(MOCK_USER);
      setProfile(MOCK_PROFILE);
      setRoles(['borrower']);
      return;
    }
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
      },
    });
    if (error) setError(error.message);
  };

  const logout = async () => {
    setError(null);
    if (isDevelopment) {
      console.log('🔧 Development mode: Mock logout');
      setUser(null);
      setSession(null);
      setProfile(null);
      setRoles([]);
      return;
    }
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setProfile(null);
    setRoles([]);
  };

  const value: AuthContextType = {
    user,
    session,
    profile,
    roles,
    loading,
    loginWithGoogle,
    loginWithPassword,
    signupWithPassword,
    logout,
    error,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}; 