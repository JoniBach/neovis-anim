import { useCallback, useEffect, useMemo, useState } from "react";
import { query } from "../api/neows/neows";
import { useFirebaseAuth } from "../contexts/FirebaseAuthContext";
import { Table } from "../components/Table";
import { useNavigate, useParams } from "react-router-dom";
import { KeyboardArrowLeft, Logout } from "@styled-icons/material";
import { signOut } from "../api/user/signOut";
import { Bar } from "../components/Bar";

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
  const goto = useNavigate();
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
      <Bar>
        <button onClick={() => goto(-1)}>
          <KeyboardArrowLeft size={20} /> go back
        </button>
        <button onClick={() => signOut()}>
          <Logout size={20} /> Sign out {user.email}
        </button>
        <h5>
          {loading
            ? "processing, please wait"
            : `close approaches for ${data?.name}`}
        </h5>
      </Bar>
      {loading
        ? "fetching data please wait..."
        : data && (
            <>
              <h2>Next 5 passes</h2>
              <Table
                onClick={(e) => console.log(e)}
                columns={columns}
                data={visitsAfterToday}
              />
              <h2>Previous 5 passes</h2>

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
