# Security notes

- Never store third-party voting-platform passwords.
- Never expose the Supabase service-role key in client code or GitHub.
- Proof storage is private. Access is restricted by Supabase RLS/storage policies.
- Moderator approval is performed through the `review_proof` security-definer function, which checks staff role.
- Proof uploads are limited to PNG/JPEG/WebP and 5 MB by the storage bucket configuration.
- Before launch, add rate limiting/bot protection at the authentication/provider layer and review Supabase Auth abuse-prevention settings.
- Configure and enforce an evidence deletion schedule after verification.
