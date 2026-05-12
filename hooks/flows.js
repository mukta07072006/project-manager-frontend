import { useEffect, useState } from "react";

export const useRecentFlows = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch('https://project-manager-server-wev3.onrender.com/recentflows');
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