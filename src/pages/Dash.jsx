import { useEffect, useState } from "react";
import { query } from "../api/neows/neows";
import { Input } from "../components/Input";
import { useFirebaseAuth } from "../contexts/FirebaseAuthContext";
import DatePicker from "react-datepicker";
import moment from "moment/moment";
import { Table } from "../components/Table";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "../utils/useQuery";
import { Logout } from "@styled-icons/material";
import { signOut } from "../api/user/signOut";
import { flattenArray } from "../utils/flattenArray";

const columns = [
  {
    Header: "ID",
    accessor: "neo_reference_id",
  },
  {
    Header: "Name",
    accessor: "name",
  },

  {
    Header: "Hazard",
    id: "is_potentially_hazardous_asteroid",
    accessor: (d) => d.is_potentially_hazardous_asteroid && "yes",
  },
  {
    Header: "Sentry",
    id: "is_sentry_object",
    accessor: (d) => d.is_sentry_object && "yes",
  },
  {
    Header: "Min Estimated Diamiter (m)",
    id: "estimated_diameter.meters.estimated_diameter_min",
    accessor: (d) =>
      d.estimated_diameter.meters.estimated_diameter_min.toFixed(1),
  },
  {
    Header: "Max Estimated Diamiter (m)",
    id: "estimated_diameter.meters.estimated_diameter_max",
    accessor: (d) =>
      d.estimated_diameter.meters.estimated_diameter_max.toFixed(1),
  },
  {
    Header: "Date",
    accessor: "date",
  },
];

export const Dash = () => {
  const user = useFirebaseAuth();
  const goto = useNavigate();
  const { search } = useLocation();

  const range = useQuery(search);
  const [data, setData] = useState();

  const [count, setCount] = useState(0);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [loading, setLoading] = useState(false);

  const handleFetch = async (dates) => {
    if (dates.start && dates.end) {
      const { element_count, near_earth_objects } = await query({
        start_date: dates.start,
        end_date: dates.end,
      });

      const results = flattenArray(near_earth_objects);
      setStartDate(new Date(dates.start));
      setEndDate(new Date(dates.end));
      setCount(element_count);
      setData(results);
      setLoading(false);

      return data;
    } else {
      setLoading(false);
      return null;
    }
  };

  const handleClick = async (asteroid) => {
    const { neo_reference_id } = asteroid;
    goto(`/neo/${neo_reference_id}`);
  };

  const handleQuery = () => {
    goto(
      `/dash?start=${moment(startDate).format("yyyy-MM-DD")}&end=${moment(
        endDate
      ).format("yyyy-MM-DD")}`
    );
    handleFetch({
      start: moment(startDate).format("yyyy-MM-DD"),
      end: moment(endDate).format("yyyy-MM-DD"),
    });
  };
  const handleClear = () => {
    goto("/dash");
    setStartDate(null);
    setEndDate(null);
    setCount(null);
    setData(null);
  };

  useEffect(() => {
    if (range?.start && range?.end) {
      handleFetch(range);
    }
  }, []);

  return (
    <div>
      <button onClick={() => signOut()}>
        <Logout size={20} /> exit {user.email}
      </button>
      <DatePicker
        selected={startDate}
        customInput={<Input label="start date" />}
        onChange={(date) => {
          setStartDate(date);
        }}
      />
      <DatePicker
        selected={endDate}
        customInput={<Input label="end date" />}
        onChange={(date) => {
          setEndDate(date);
        }}
      />
      {loading ? (
        "fetching data please wait..."
      ) : (
        <>
          <button onClick={() => handleQuery()}>submit</button>
          <button onClick={() => handleClear()}>clear</button>
        </>
      )}
      <div>
        {count && <div>found {count} records</div>}
        {data && (
          <Table
            onClick={(e) => handleClick(e)}
            columns={columns}
            data={data}
            paginate
          />
        )}
      </div>
    </div>
  );
};
