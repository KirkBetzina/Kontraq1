import { supabase } from './supabase';
import { Job, Subcontractor, Advertisement } from '@/types';

// Base URL for Supabase functions
const FUNCTION_BASE_URL = 'https://zrisgylwzfdxbwhagiks.supabase.co/functions/v1';

// Job-related API functions
export const fetchJobs = async () => {
  const { data, error } = await supabase
    .from('jobs')
    .select('*');
  
  if (error) throw error;
  return data as Job[];
};

export const fetchJobById = async (jobId: string) => {
  const { data, error } = await supabase
    .from('jobs')
    .select('*')
    .eq('id', jobId)
    .single();
  
  if (error) throw error;
  return data as Job;
};

export const updateJobStatus = async (jobId: string, status: 'Open' | 'Assigned' | 'Completed') => {
  const { data, error } = await supabase
    .from('jobs')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', jobId)
    .select();
  
  if (error) throw error;
  return data[0] as Job;
};

export const assignJob = async (jobId: string, subcontractorId: string) => {
  const response = await fetch(`${FUNCTION_BASE_URL}/assign-job`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ jobId, subcontractorId }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to assign job');
  }

  return await response.json();
};

// Subcontractor-related API functions
export const fetchSubcontractors = async () => {
  const { data, error } = await supabase
    .from('subcontractors')
    .select('*');
  
  if (error) throw error;
  return data as Subcontractor[];
};

export const fetchSubcontractorById = async (subcontractorId: string) => {
  const { data, error } = await supabase
    .from('subcontractors')
    .select('*')
    .eq('id', subcontractorId)
    .single();
  
  if (error) throw error;
  return data as Subcontractor;
};

export const updateSubcontractorAvailability = async (
  subcontractorId: string, 
  availability: 'Available' | 'Booked',
  zipCodes?: string[],
  specialties?: string[]
) => {
  const response = await fetch(`${FUNCTION_BASE_URL}/update-availability`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ subcontractorId, availability, zipCodes, specialties }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to update availability');
  }

  return await response.json();
};

// Advertisement-related API functions
export const fetchActiveAds = async () => {
  const { data, error } = await supabase
    .from('advertisements')
    .select('*')
    .eq('is_active', true)
    .gte('end_date', new Date().toISOString().split('T')[0]);
  
  if (error) throw error;
  return data as Advertisement[];
};

export const trackAdClick = async (adId: string) => {
  const response = await fetch(`${FUNCTION_BASE_URL}/track-ad-click`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ adId }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to track ad click');
  }

  return await response.json();
};
