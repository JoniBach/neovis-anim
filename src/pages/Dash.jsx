import { useState } from "react";
import { query } from "../api/neows/neows";
import { Input } from "../components/Input";
import { useFirebaseAuth } from "../contexts/FirebaseAuthContext";
import DatePicker from "react-datepicker";
import moment from "moment/moment";
import { Table } from "../components/Table";

export const Dash = () => {
  const user = useFirebaseAuth();
  const [data, setData] = useState();
  const [count, setCount] = useState(0);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [loading, setLoading] = useState(false);

  const handleFetch = async () => {
    try {
      setLoading(true);
      setData(null);
      setCount(null);
      if (startDate && endDate) {
        const { element_count, near_earth_objects } = await query({
          start_date: startDate,
          end_date: endDate,
        });

        var dataToArr = Object.keys(near_earth_objects).map((key, index) =>
          near_earth_objects[key].map((nearEarthObject) => ({
            ...nearEarthObject,
            date: key,
          }))
        );

        const results = dataToArr.flat(1);

        setCount(element_count);
        setData(results);

        setLoading(false);

        return data;
      }
    } catch (error) {
      setLoading(false);
      return null;
    }
  };
  console.log(data);

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
      Header: "Potentially Hazardous",
      id: "is_potentially_hazardous_asteroid",
      accessor: (d) => d.is_potentially_hazardous_asteroid.toString(),
    },
    {
      Header: "Sentry",
      id: "is_sentry_object",
      accessor: (d) => d.is_sentry_object.toString(),
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

  const handleClick = async (asteroid) => {
    const { neo_reference_id } = asteroid;

    const data = await query({
      asteroid_id: neo_reference_id,
    });
    console.log(data);
  };

  return (
    <div>
      Signed in as {user.email}
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
        <button onClick={() => handleFetch()}>submit</button>
      )}
      <div>
        {count && <div>found {count} records</div>}
        {data && (
          <Table
            onClick={(e) => handleClick(e)}
            columns={columns}
            data={data}
          />
        )}
      </div>
    </div>
  );
};
