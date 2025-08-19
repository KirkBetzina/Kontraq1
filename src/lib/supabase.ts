import { createClient } from '@supabase/supabase-js';


// Initialize Supabase client
// Using direct values from project configuration
const supabaseUrl = 'https://zrisgylwzfdxbwhagiks.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpyaXNneWx3emZkeGJ3aGFnaWtzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDczOTA0NTksImV4cCI6MjA2Mjk2NjQ1OX0.tvN3Sgod9pDbuZ1IOrGkId-xg5jmkzc2g7p6vKMQBjM';
const supabase = createClient(supabaseUrl, supabaseKey);


export { supabase };