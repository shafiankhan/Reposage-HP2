import { supabase } from '../lib/supabase';
import type { Database } from '../lib/supabase';

export type Tables = Database['public']['Tables'];

export class SupabaseService {
  async createUser(userData: Tables['users']['Insert']) {
    const { data, error } = await supabase
      .from('users')
      .insert(userData)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async getUser(userId: string) {
    const { data, error } = await supabase
      .from('users')
      .select()
      .eq('id', userId)
      .single();

    if (error) throw error;
    return data;
  }

  async createProject(projectData: Tables['projects']['Insert']) {
    const { data, error } = await supabase
      .from('projects')
      .insert(projectData)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async getProjects(userId: string) {
    const { data, error } = await supabase
      .from('projects')
      .select()
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  async saveChatMessage(messageData: Tables['chat_messages']['Insert']) {
    const { data, error } = await supabase
      .from('chat_messages')
      .insert(messageData)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async getChatMessages(projectId: string) {
    const { data, error } = await supabase
      .from('chat_messages')
      .select()
      .eq('project_id', projectId)
      .order('created_at', { ascending: true });

    if (error) throw error;
    return data;
  }

  async createMeeting(meetingData: Tables['meetings']['Insert']) {
    const { data, error } = await supabase
      .from('meetings')
      .insert(meetingData)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async getMeetings(projectId: string) {
    const { data, error } = await supabase
      .from('meetings')
      .select()
      .eq('project_id', projectId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }
}

export const supabaseService = new SupabaseService();