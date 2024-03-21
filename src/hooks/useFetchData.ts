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
        //Without the signal option, calling abort() won't affect the request, as the request won't be associated with an AbortController.
        //This means that when the cleanup function runs (upon component unmount or url change), calling abort() on the AbortController won't have any effect
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
