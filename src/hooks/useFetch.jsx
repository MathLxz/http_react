import { useState, useEffect } from 'react';

export const useFetch = (url) => {
  const [data, setData] = useState(null);

  const [config, setConfig] = useState(null);
  const [method, setMethod] = useState(null);
  const [callFetch, setCallFetch] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const httpConfig = (data, method) => {
    if (method === 'POST') {
      setConfig({
        method,
        headers: {
          'Content-Type': 'applications/json',
        },
        body: JSON.stringify(data),
      });
      setMethod(method);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const res = await fetch(url);
        const json = await res.json();

        setData(json);
      } catch (error) {
        console.log(error.message);
        setError('Ocorreu um erro ao carregar os dados.');
      }
      setLoading(false);
    };
    fetchData();
  }, [url, callFetch]);

  useEffect(() => {
    const httpRequest = async () => {
      let json;

      if (method === 'POST') {
        let fetchOptions = [url, config];

        setLoading(true);

        const res = await fetch(...fetchOptions);

        json = await res.json();

        setLoading(false);
      }
      setCallFetch(json);
    };

    httpRequest();
  }, [config, method, url]);

  return { data, httpConfig, loading, error };
};
