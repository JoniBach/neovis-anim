import axios from "axios";

export const query = async ({ start_date, end_date, asteroid_id }) => {
  try {
    const { data } = await axios.get(
      `https://api.nasa.gov/neo/rest/v1/${
        asteroid_id ? `neo/${asteroid_id}` : "feed"
      }`,
      {
        params: {
          start_date,
          end_date,
          api_key: process.env.REACT_APP_NASA_API_KEY,
        },
      }
    );
    return data;
  } catch (error) {
    console.log(error);
    throw Error(
      error?.response?.data?.error_message || "failed to retrieve data"
    );
  }
};
