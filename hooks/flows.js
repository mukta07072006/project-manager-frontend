import { useEffect, useState } from "react";

export const useRecentFlows = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch('http://localhost:8000/recentflows');
        const json = await res.json();
        setData(json);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  return { data, loading };
};