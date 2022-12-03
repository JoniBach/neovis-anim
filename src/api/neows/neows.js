import axios from "axios";
import moment from "moment";

export const query = async ({ start_date, end_date, asteroid_id }) => {
  // the API documentation does not list any pagination properties
  const { data } = await axios.get(
    `https://api.nasa.gov/neo/rest/v1/${
      asteroid_id ? `neo/${asteroid_id}` : "feed"
    }`,
    {
      params: {
        start_date: moment(start_date).format("yyyy-MM-DD"),
        end_date: moment(end_date).format("yyyy-MM-DD"),
        api_key: process.env.REACT_APP_NASA_API_KEY,
      },
    }
  );
  return data;
};
