import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://wmoftrdofiujytkojvoz.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indtb2Z0cmRvZml1anl0a29qdm96Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTY1MDY5MDYsImV4cCI6MjAxMjA4MjkwNn0.dXgqhgJ4nGdCVSQt1TAMElKtITKR4KS6cxSxWAAZ244'
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;
