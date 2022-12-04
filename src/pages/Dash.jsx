import { useCallback, useEffect, useMemo, useState } from "react";
import { query } from "../api/neows/neows";
import { Input } from "../components/Input";
import { useFirebaseAuth } from "../contexts/FirebaseAuthContext";
import DatePicker from "react-datepicker";
import moment from "moment/moment";
import { Table } from "../components/Table";
import { useLocation, useNavigate } from "react-router-dom";
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

const handleFetch = async (dates) => {
  if (dates.start && dates.end) {
    const { element_count, near_earth_objects } = await query({
      start_date: dates.start,
      end_date: dates.end,
    });

    const results = flattenArray(near_earth_objects);

    const data = {
      results,
      element_count,
      dates: {
        start: new Date(dates.start),
        end: new Date(dates.end),
      },
    };

    return data;
  } else {
    return null;
  }
};

export const Dash = () => {
  const user = useFirebaseAuth();
  const goto = useNavigate();
  const { search } = useLocation();
  const [data, setData] = useState();
  const [count, setCount] = useState(0);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [loading, setLoading] = useState(false);

  const range = useMemo(
    () =>
      Object.assign(
        {},
        ...search
          .slice(1)
          .split("&")
          .map((term) => ({
            [term.split("=")[0]]: term.split("=")[1],
          }))
      ),
    [search]
  );

  const handleClick = useCallback(
    async (asteroid) => {
      const { neo_reference_id } = asteroid;
      goto(`/neo/${neo_reference_id}`);
    },
    [goto]
  );

  const handleQuery = useCallback(() => {
    goto(
      `/dash?start=${moment(startDate).format("yyyy-MM-DD")}&end=${moment(
        endDate
      ).format("yyyy-MM-DD")}`
    );
  }, [endDate, goto, startDate]);

  const handleClear = () => {
    goto("/dash");
    setStartDate(null);
    setEndDate(null);
    setCount(null);
    setData(null);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    handleFetch(range).then(({ results, element_count, dates }) => {
      setData(results);
      setCount(element_count);
      setEndDate(dates.end);
      setStartDate(dates.start);
      setLoading(false);
    });
  }, [range]);

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
      <button onClick={() => handleClear()}>clear</button>

      {loading ? (
        "fetching data please wait..."
      ) : (
        <>
          <button onClick={() => handleQuery()}>submit</button>
        </>
      )}
      <div>
        {data && !loading && (
          <>
            {count && <div>found {count} records</div>}
            <Table
              onClick={(e) => handleClick(e)}
              columns={columns}
              data={data}
              paginate
            />
          </>
        )}
      </div>
    </div>
  );
};
