import axios from "axios";

export function GeoCoding(searchText, setSearchList) {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${searchText}`;

  axios
    .get(url)
    .then((response) => {
      if (response.data.results !== undefined) {
        setSearchList(response.data.results);
      } else {
        setSearchList([]);
      }
    })
    .catch((error) => {
      console.log(error);
    });
}
