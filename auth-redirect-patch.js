(() => {
  const lib = window.supabase;
  if (!lib || typeof lib.createClient !== 'function') return;

  const APP_URL = 'https://daeimjk.github.io/army-voting-hub/';
  const originalCreateClient = lib.createClient.bind(lib);

  lib.createClient = (...args) => {
    const client = originalCreateClient(...args);
    const originalSignUp = client.auth.signUp.bind(client.auth);
    const originalSignIn = client.auth.signInWithPassword.bind(client.auth);

    client.auth.signUp = (credentials = {}) => {
      const options = {
        ...(credentials.options || {}),
        emailRedirectTo: APP_URL
      };
      return originalSignUp({ ...credentials, options });
    };

    client.auth.signInWithPassword = async (credentials = {}) => {
      const result = await originalSignIn(credentials);
      if (result?.error?.code === 'email_not_confirmed' && credentials?.email) {
        const key = `armyHubConfirmResend:${credentials.email}`;
        const last = Number(localStorage.getItem(key) || 0);
        const now = Date.now();
        if (now - last > 60000) {
          const resend = await client.auth.resend({
            type: 'signup',
            email: credentials.email,
            options: { emailRedirectTo: APP_URL }
          });
          if (!resend.error) {
            localStorage.setItem(key, String(now));
            return {
              ...result,
              error: {
                ...result.error,
                message: 'Email not confirmed. A fresh confirmation email has been sent.'
              }
            };
          }
        }
      }
      return result;
    };

    return client;
  };
})();
