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
import { Bar } from "../components/Bar";

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
    Header: "Min Estimated Diameter (m)",
    id: "estimated_diameter.meters.estimated_diameter_min",
    accessor: (d) =>
      d.estimated_diameter.meters.estimated_diameter_min.toFixed(1),
  },
  {
    Header: "Max Estimated Diameter (m)",
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
    if (range?.start && range.end) {
      setLoading(true);
      handleFetch(range).then(({ results, element_count, dates }) => {
        setData(results);
        setCount(element_count);
        setEndDate(dates.end);
        setStartDate(dates.start);
        setLoading(false);
      });
    }
  }, [range]);

  const handleDisplayText = () => {
    if (loading) return `processing, please wait`;
    if (data) return `${count} records found`;
    return "enter dates to get near earth objects ";
  };

  const displayText = handleDisplayText();

  return (
    <div>
      <Bar>
        <DatePicker
          selected={startDate}
          customInput={<Input label="Start Date" />}
          onChange={(date) => {
            setStartDate(date);
          }}
        />
        <DatePicker
          selected={endDate}
          customInput={<Input label="End Date" />}
          onChange={(date) => {
            setEndDate(date);
          }}
        />
        {!loading && <button onClick={() => handleQuery()}>Submit</button>}
        <button onClick={() => handleClear()}>Clear</button>
        <button onClick={() => signOut()}>
          <Logout size={20} /> Sign Out {user.email}
        </button>
        <h5>
          {/* {loading ? "fetching data, please wait..." : `${count} records found`} */}
          {displayText}
        </h5>
      </Bar>

      <div>
        {data && !loading && (
          <>
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
