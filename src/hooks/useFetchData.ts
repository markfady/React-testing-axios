import React from "react";
import axios from "axios";
export const useFetchData = (url: string) => {
  const [data, setData] = React.useState(null);
  const [error, setError] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const abortController = new AbortController();
    const fetchData = async () => {
      try {
        //if we sent request without signal option This means that when the cleanup function runs (upon component unmount or url change)
        //calling abort() the AbortController won't have any effect 
        const res = await axios.get(url,{signal:abortController.signal});
        setData(res.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      abortController.abort();
    };
  }, [url]);

  return { data, error, loading };
};
