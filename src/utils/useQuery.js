import { useLocation } from "react-router-dom";

export function useQuery() {
  const { search } = useLocation();

  const q = search.slice(1).split("&");
  const params = q.map((term) => ({
    [term.split("=")[0]]: term.split("=")[1],
  }));

  const paramObj = Object.assign({}, ...params);
  return search ? paramObj : null;
}
