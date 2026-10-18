(() => {
  const lib = window.supabase;
  if (!lib || typeof lib.createClient !== 'function') return;

  const originalCreateClient = lib.createClient.bind(lib);
  lib.createClient = (...args) => {
    const client = originalCreateClient(...args);
    const originalSignUp = client.auth.signUp.bind(client.auth);

    client.auth.signUp = (credentials = {}) => {
      const options = {
        ...(credentials.options || {}),
        emailRedirectTo: 'https://daeimjk.github.io/army-voting-hub/'
      };
      return originalSignUp({ ...credentials, options });
    };

    return client;
  };
})();
