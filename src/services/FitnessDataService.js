import { supabase } from '../lib/supabase';

class FitnessDataService {
  async saveFitnessProfile(profileData) {
    try {
      const { data, error } = await supabase
        .from('fitness_profiles')
        .insert([profileData])
        .select()
        .single();
      
      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Save fitness profile error:', error);
      return { success: false, error: 'Failed to save fitness profile' };
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

  async getUserFitnessProfiles(userId) {
    try {
      const { data, error } = await supabase
        .from('fitness_profiles')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Get user fitness profiles error:', error);
      return { success: false, error: 'Failed to load fitness profiles' };
    }
  }

  async getUserFitnessPrograms(userId) {
    try {
      const { data, error } = await supabase
        .from('fitness_programs')
        .select(`
          *,
          fitness_profiles (*)
        `)
        .eq('user_id', userId)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Get user fitness programs error:', error);
      return { success: false, error: 'Failed to load fitness programs' };
    }
  }

  async updateFitnessProfile(profileId, updates) {
    try {
      const { data, error } = await supabase
        .from('fitness_profiles')
        .update(updates)
        .eq('id', profileId)
        .select()
        .single();
      
      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Update fitness profile error:', error);
      return { success: false, error: 'Failed to update fitness profile' };
    }
  }

  async deleteFitnessProfile(profileId) {
    try {
      const { error } = await supabase
        .from('fitness_profiles')
        .delete()
        .eq('id', profileId);
      
      if (error) throw error;
      return { success: true };
    } catch (error) {
      console.error('Delete fitness profile error:', error);
      return { success: false, error: 'Failed to delete fitness profile' };
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
