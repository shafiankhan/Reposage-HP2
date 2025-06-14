import { supabase } from '../lib/supabase';
import type { UserDocument, ProjectDocument } from '../lib/supabase';

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
  },

  // Project operations
  async createProject(projectData: Omit<ProjectDocument, 'id' | 'created_at' | 'updated_at'>): Promise<string> {
    const { data, error } = await supabase
      .from('projects')
      .insert({
        user_id: projectData.user_id,
        name: projectData.name,
        description: projectData.description,
        github_url: projectData.github_url,
        owner: projectData.owner,
        repo: projectData.repo,
        is_private: projectData.is_private,
        stars: projectData.stars,
        forks: projectData.forks,
        issues: projectData.issues,
        language: projectData.language,
        last_updated: projectData.last_updated
      })
      .select('id')
      .single();

    if (error) {
      console.error('Error creating project:', error);
      throw error;
    }

    return data.id;
  },

  async getProjects(userId: string): Promise<ProjectDocument[]> {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching projects:', error);
      throw error;
    }

    return data || [];
  },

  async deleteProject(projectId: string): Promise<void> {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', projectId);

    if (error) {
      console.error('Error deleting project:', error);
      throw error;
    }
  }
};