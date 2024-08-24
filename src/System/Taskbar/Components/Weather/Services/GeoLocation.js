export const GeoLocation = (location, setLocation) => {
  function success(position) {
    setLocation({
      ...location,
      lat: position.coords.latitude,
      long: position.coords.longitude,
      alt: position.coords.altitude,
      location:{
        name: "",
        country: "",
        country_code: "",
      },
      source: "GPS",
      status: "Success",
    });
  }

  function error() {
    setLocation({ ...location, status: "Gelocation Unavalable" });
  }

  if (navigator.geolocation) {
    setLocation({ ...location, status: "Locating..." });
    navigator.geolocation.getCurrentPosition(success, error);
  } else {
    setLocation({ ...location, status: "Gelocation Unavalable in browser" });
  }
};
