import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qjgvvnkxfcfxuizdriqc.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFqZ3Z2bmt4ZmNmeHVpemRyaXFjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDM5NDgwNjUsImV4cCI6MjAxOTUyNDA2NX0.ETbCxiIeDNY4_SCyp5xJcxFy-2D2JuGtLyxXjOsOuWo';
export const supabase = createClient(supabaseUrl, supabaseAnonKey);