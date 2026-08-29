-- Expected public.clients_documents shape used by the admin API.

-- id uuid primary key
-- prepare_client_id uuid not null unique
--   references public.prepare_clients(id) on delete cascade
-- documents jsonb not null
--   object with exactly the keys agreement, claim, release
--   each value is null or { fields: object, saved_at: timestamptz }
--   Application of release order is stored at documents.claim.matter
-- created_at timestamptz not null
-- updated_at timestamptz not null

-- App keys inside documents:
--   agreement          = Client authority form
--   claim              = Victim claim (letter)
--   claim.matter       = Application of release order (court application)
--   release            = Release order
