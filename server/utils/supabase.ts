import { createClient } from '@supabase/supabase-js'

let _client: ReturnType<typeof createClient> | null = null

export function useSupabaseServer() {
  if (_client) return _client

  const config = useRuntimeConfig()
  const url = config.public.supabase.url
  const serviceRoleKey = config.supabase.serviceRoleKey

  if (!url || !serviceRoleKey) {
    throw new Error('Missing Supabase server config (URL or service role key)')
  }

  _client = createClient(url, serviceRoleKey)
  return _client
}
