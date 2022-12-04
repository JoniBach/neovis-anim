import { useEffect, useState } from "react";
import { query } from "../api/neows/neows";
import { Input } from "../components/Input";
import { useFirebaseAuth } from "../contexts/FirebaseAuthContext";
import DatePicker from "react-datepicker";
import moment from "moment/moment";
import { Table } from "../components/Table";
import { useNavigate, useParams } from "react-router-dom";
import { Timestamp } from "firebase/firestore";

export const Neo = () => {
  const user = useFirebaseAuth();
  const goto = useNavigate();
  const { id } = useParams();

  const [data, setData] = useState();
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleFetch = async () => {
    setLoading(true);
    setData(null);
    setCount(null);
    try {
      if (id) {
        const data = await query({
          asteroid_id: id,
        });
        setCount(data.close_approach_data.length);
        setData(data);

        setLoading(false);

        return data;
      }
    } catch (error) {
      setLoading(false);
      return null;
    }
  };

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

  const timeStamp = Date.now();

  console.log(timeStamp);

  const visitsAfterToday = data?.close_approach_data
    ?.filter(
      ({ epoch_date_close_approach }, i) =>
        epoch_date_close_approach > timeStamp
    )
    .slice(0, 5);

  const visitsBeforeToday = data?.close_approach_data
    ?.filter(
      ({ epoch_date_close_approach }, i) =>
        epoch_date_close_approach < timeStamp
    )
    .slice(-5)
    .reverse();

  useEffect(() => {
    handleFetch();
  }, []);
  return (
    <div>
      <div>Signed in as {user.email}</div>
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