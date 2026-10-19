(() => {
  if (!window.supabase?.createClient || !window.APP_DATA) return;
  const originalCreate = window.supabase.createClient.bind(window.supabase);
  const tableData = {
    awards: () => window.APP_DATA.awards || [],
    missions: () => window.APP_DATA.missions || [],
    badge_definitions: () => window.APP_DATA.badges || []
  };
  window.supabase.createClient = (...args) => {
    const client = originalCreate(...args);
    const originalFrom = client.from.bind(client);
    client.from = table => {
      if (!tableData[table]) return originalFrom(table);
      const rows = tableData[table]().map(content => ({ content }));
      const query = {
        select(){ return query; },
        eq(){ return query; },
        then(resolve,reject){ return Promise.resolve({ data: rows, error: null }).then(resolve,reject); }
      };
      return query;
    };
    return client;
  };
})();