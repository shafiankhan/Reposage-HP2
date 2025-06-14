import { supabase } from '../lib/supabase';
import type { UserDocument } from '../lib/supabase';

export const supabaseService = {
  // User operations
  async getUserByAuthId(authId: string): Promise<UserDocument | null> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', authId)
      .single();

    if (error) {
      console.error('Error fetching user by auth ID:', error);
      return null;
    }

    return data;
  },

  async createUser(userData: Omit<UserDocument, 'id' | 'created_at' | 'updated_at'>): Promise<UserDocument | null> {
    const { data: authUser } = await supabase.auth.getUser();
    
    if (!authUser.user) {
      throw new Error('No authenticated user found');
    }

    const { data, error } = await supabase
      .from('users')
      .insert({
        id: authUser.user.id,
        github_id: userData.github_id,
        username: userData.username,
        email: userData.email,
        avatar_url: userData.avatar_url,
        credits: userData.credits
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating user:', error);
      throw error;
    }

    return data;
  },

  async updateUser(userId: string, updates: Partial<UserDocument>): Promise<UserDocument | null> {
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', userId)
      .select()
      .single();

    if (error) {
      console.error('Error updating user:', error);
      throw error;
    }

    return data;
  }
};