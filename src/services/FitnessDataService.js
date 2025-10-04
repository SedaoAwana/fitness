import { supabase } from '../lib/supabase';

class FitnessDataService {
  async createUserProfile(profileData) {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .insert([profileData])
        .select()
        .single();
      
      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Create user profile error:', error);
      return { success: false, error: 'Failed to create user profile' };
    }
  }

  async saveFitnessProgram(programData) {
    try {
      const { data, error } = await supabase
        .from('fitness_programs')
        .insert([programData])
        .select()
        .single();
      
      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Save fitness program error:', error);
      return { success: false, error: 'Failed to save fitness program' };
    }
  }

  async getUserFitnessPrograms(userId) {
    try {
      const { data, error } = await supabase
        .from('fitness_programs')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Get user fitness programs error:', error);
      return { success: false, error: 'Failed to load fitness programs' };
    }
  }

  // Save photo to Supabase Storage
  async uploadPhoto(file, userId) {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${userId}/${Date.now()}.${fileExt}`;
      
      const { data, error } = await supabase.storage
        .from('fitness-photos')
        .upload(fileName, file);
      
      if (error) throw error;
      
      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('fitness-photos')
        .getPublicUrl(fileName);
      
      return { success: true, url: publicUrl };
    } catch (error) {
      console.error('Upload photo error:', error);
      return { success: false, error: 'Failed to upload photo' };
    }
  }
}

export default new FitnessDataService();
