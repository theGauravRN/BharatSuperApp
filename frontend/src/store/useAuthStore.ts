'use client';

import { create } from 'zustand';
import type { User } from '@supabase/supabase-js';
import type { Profile } from '@/types/database.types';
import { createClient } from '@/lib/supabase/client';

type AuthState = {
  user: User | null;
  profile: Profile | null;
  session: { access_token: string; refresh_token?: string } | null;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setProfile: (profile: Profile | null) => void;
  setSession: (session: { access_token: string; refresh_token?: string } | null) => void;
  logout: () => Promise<void>;
  refreshSession: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  profile: null,
  session: null,
  isLoading: true,

  setUser: (user) => set({ user }),
  setProfile: (profile) => set({ profile }),
  setSession: (session) => set({ session }),

  logout: async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    set({ user: null, profile: null, session: null });
  },

  refreshSession: async () => {
    const supabase = createClient();
    const { data: { session } } = await supabase.auth.getSession();
    set({ session: session ? { access_token: session.access_token, refresh_token: session.refresh_token } : null });
    if (session?.user) {
      set({ user: session.user });
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();
      set({ profile: profile ?? null });
    } else {
      set({ user: null, profile: null });
    }
    set({ isLoading: false });
  },
}));
