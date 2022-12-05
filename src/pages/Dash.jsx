import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { query } from "../api/neows/neows";
import { Input } from "../components/Input";
import { useFirebaseAuth } from "../contexts/FirebaseAuthContext";
import DatePicker from "react-datepicker";
import moment from "moment/moment";
import { Table } from "../components/Table";
import { useLocation, useNavigate } from "react-router-dom";
import { Logout, Visibility, VisibilityOff } from "@styled-icons/material";
import { signOut } from "../api/user/signOut";
import { flattenArray } from "../utils/flattenArray";
import { Bar } from "../components/Bar";
import { Bubble, getElementAtEvent } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import useWindowDimensions from "../utils/useWindowDimensions";

ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

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
    try {
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
    } catch (error) {
      alert(error);
    }
  } else {
    return null;
  }
};

export const chartOptions = {
  scales: {
    y: {
      beginAtZero: true,

      title: {
        display: true,
        text: "Miss Distance (miles)",
      },
      ticks: {
        callback: function (value, index, ticks) {
          return value / 1000000 + " MM";
        },
      },
    },
    x: {
      beginAtZero: true,

      title: {
        display: true,
        text: "Relative Velocity (miles per hour)",
      },
      ticks: {
        callback: function (value, index, ticks) {
          return value / 1000 + " K";
        },
      },
    },
  },
  plugins: {
    tooltip: {
      callbacks: {
        title: (datapoint) => {
          return "NEO: " + datapoint[0]?.raw?.data?.name;
        },
        label: (datapoint) => {
          return (
            "max diameter:" +
            datapoint?.raw?.data?.maxDiameter.toFixed(1) +
            "m"
          );
        },
      },
    },
  },
};
export const Dash = () => {
  const { width } = useWindowDimensions();
  const user = useFirebaseAuth();
  const goto = useNavigate();
  const { search } = useLocation();
  const [data, setData] = useState();
  const [count, setCount] = useState(0);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [loading, setLoading] = useState(false);

  const handleDisplayText = () => {
    if (loading) return `processing, please wait`;
    if (data) return `${count} records found`;
    return "enter dates to get near earth objects ";
  };

  const displayText = handleDisplayText();

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

  const bubbleScale = (size) => {
    if (size < 2) return 2;
    if (size > 20) return 50;
    return size;
  };

  const bubbleMultiplier = width / 60000;

  const newChartData = {
    datasets: [
      {
        label: "Potentially Hazardous",
        data: data
          ?.filter(
            ({ is_potentially_hazardous_asteroid }) =>
              is_potentially_hazardous_asteroid === true
          )
          ?.map((neo) => ({
            x: neo.close_approach_data[0].relative_velocity.miles_per_hour,
            y: neo.close_approach_data[0].miss_distance.miles,
            r: bubbleScale(
              neo.estimated_diameter.meters.estimated_diameter_max *
                bubbleMultiplier
            ),
            data: {
              velocity:
                neo.close_approach_data[0].relative_velocity.miles_per_hour,
              miss_distance: neo.close_approach_data[0].miss_distance.miles,
              maxDiameter: neo.estimated_diameter.meters.estimated_diameter_max,
              name: neo.name,
              neo_reference_id: neo.neo_reference_id,
            },
          })),

        backgroundColor: "#281dff65",
      },
      {
        label: "Non Hazardous",
        data: data
          ?.filter(
            ({ is_potentially_hazardous_asteroid }) =>
              is_potentially_hazardous_asteroid === false
          )
          ?.map((neo) => ({
            x: neo.close_approach_data[0].relative_velocity.miles_per_hour,
            y: neo.close_approach_data[0].miss_distance.miles,
            r: bubbleScale(
              neo.estimated_diameter.meters.estimated_diameter_max *
                bubbleMultiplier
            ),
            data: {
              velocity:
                neo.close_approach_data[0].relative_velocity.miles_per_hour,
              miss_distance: neo.close_approach_data[0].miss_distance.miles,
              maxDiameter: neo.estimated_diameter.meters.estimated_diameter_max,
              name: neo.name,
              neo_reference_id: neo.neo_reference_id,
            },
          })),
        backgroundColor: "#66ff0083",
        // pointStyle: "triangle",
      },
    ],
  };

  useEffect(() => {
    if (range?.start && range.end) {
      setLoading(true);
      handleFetch(range)
        .then(({ results, element_count, dates }) => {
          setData(results);
          setCount(element_count);
          setEndDate(dates.end);
          setStartDate(dates.start);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [range]);

  const chartRef = useRef();
  const [showChart, setShowChart] = useState(true);

console.log(data)


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
        {!loading && data && (
          <button onClick={() => setShowChart(!showChart)}>
            {" "}
            {showChart ? (
              <Visibility size={20} />
            ) : (
              <VisibilityOff size={20} />
            )}{" "}
            Chart
          </button>
        )}
        <button onClick={() => handleClear()}>Clear</button>
        <button onClick={() => signOut()}>
          <Logout size={20} /> Sign Out {user.email}
        </button>
        <h5>{displayText}</h5>
      </Bar>

      <div>
        {data && !loading && (
          <>
            {showChart && (
              <div style={{ maxHeight: "95vh", maxWidth: "100vw" }}>
                <Bubble
                  ref={chartRef}
                  onClick={(e) =>
                    handleClick(
                      getElementAtEvent(chartRef.current, e)[0]?.element
                        ?.$context?.raw?.data
                    )
                  }
                  options={chartOptions}
                  data={newChartData}
                />
              </div>
            )}
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
