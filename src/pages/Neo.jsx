import { useCallback, useEffect, useMemo, useState } from "react";
import { query } from "../api/neows/neows";
import { useFirebaseAuth } from "../contexts/FirebaseAuthContext";
import { Table } from "../components/Table";
import { useParams } from "react-router-dom";
import { Logout } from "@styled-icons/material";
import { signOut } from "../api/user/signOut";

const timeStamp = Date.now();

const columns = [
  {
    Header: "Orbiting Body",
    accessor: "orbiting_body",
  },
  {
    Header: "Close Approach Date",
    accessor: "close_approach_date_full",
  },
  {
    Header: "Miss Distance (miles)",
    id: "miss_distance.miles",
    accessor: (d) => Number(d.miss_distance.miles).toFixed(1),
  },
  {
    Header: "Relative Velocity (Mph)",
    id: "relative_velocity.miles_per_hour",
    accessor: (d) => Number(d.relative_velocity.miles_per_hour).toFixed(1),
  },
];

export const Neo = () => {
  const user = useFirebaseAuth();
  const { id } = useParams();

  const [data, setData] = useState();
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleFetch = useCallback(async () => {
    setLoading(true);
    setData(null);
    setCount(null);
    if (id) {
      const data = await query({
        asteroid_id: id,
      });
      setCount(data.close_approach_data.length);
      setData(data);

      setLoading(false);

      return data;
    }
  }, [id]);

  const visitsAfterToday = useMemo(
    () =>
      data?.close_approach_data
        ?.filter(
          ({ epoch_date_close_approach }, i) =>
            epoch_date_close_approach > timeStamp
        )
        .slice(0, 5),
    [data?.close_approach_data]
  );

  const visitsBeforeToday = useMemo(
    () =>
      data?.close_approach_data
        ?.filter(
          ({ epoch_date_close_approach }, i) =>
            epoch_date_close_approach < timeStamp
        )
        .slice(-5)
        .reverse(),
    [data?.close_approach_data]
  );

  useEffect(() => {
    handleFetch();
  }, [handleFetch]);

  return (
    <div>
      <button onClick={() => signOut()}>
        <Logout size={20} /> exit {user.email}
      </button>
      {loading
        ? "fetching data please wait..."
        : data && (
            <>
              <Table
                onClick={(e) => console.log(e)}
                columns={columns}
                data={visitsAfterToday}
              />
              BeforeToday
              <Table
                onClick={(e) => console.log(e)}
                columns={columns}
                data={visitsBeforeToday}
              />
            </>
          )}
      <div>{count && <div>found {count} records</div>}</div>
    </div>
  );
};
