import { useEffect, useState } from "react";

const BASE = "https://fsa-crud-2aa9294fe819.herokuapp.com/api";
const COHORT = "/REPLACE";
const API = BASE + COHORT;

/**
 * Queries the API for a given resource
 * @returns the data if successful or the error if not
 */
export default function useQuery(resource) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!resource) return;

    const query = async () => {
      setError(null);
      try {
        const response = await fetch(API + resource);
        if (!response.ok) throw Error(`Could not query ${resource}.`);
        const result = await response.json();
        setData(result.data);
      } catch (e) {
        console.error(e);
        setError(e.message);
      }
    };
    query();
  }, [resource]);

  return { data, error };
}
