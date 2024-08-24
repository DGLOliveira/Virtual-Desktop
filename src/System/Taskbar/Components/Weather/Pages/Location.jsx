import { useState, useEffect, useRef } from "react";
import { GeoCoding } from "../Services/GeoCoding.js";
import { CircleFlag } from "react-circle-flags";
import { FaSearch } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { MapView } from "../Services/OpenLayers.jsx";
import { FaArrowRotateRight } from "react-icons/fa6";

export const Location = ({ location, setLocation, widgetState, setWidgetState }) => {
    const searchRef = useRef(null);
    const [newLocation, setNewLocation] = useState(structuredClone(location));
    const [searchText, setSearchText] = useState("");
    const [searchList, setSearchList] = useState([]);
    const [showSearchList, setShowSearchList] = useState(false);
    const handleSearchButton = (index) => {
        searchRef.current.focus();
        setNewLocation({
            lat: searchList[index].latitude,
            long: searchList[index].longitude,
            alt: searchList[index].elevation,
            location: {
                name: searchList[index].name,
                country: searchList[index].country,
                country_code: searchList[index].country_code.toLowerCase(),
            },
            source: "Code",
            status: "Success",
        });
        setSearchText(searchList[index].name);
    }

    useEffect(() => {
        setNewLocation(location);
    }, [location])

    useEffect(() => {
        GeoCoding(searchText, setSearchList);
    }, [searchText])
    
    

    return (
        <weather-location>
            <div style={{ display: "flex", width: "100%", flexDirection: "row", alignItems: "center", justifyContent: "center", fontSize: "12px", background: "black" }}>
                <FaLocationDot /> {
                    widgetState === "Done" ? <>
                        {location.source === "Code" && <>
                            {location.location.name}{" "}
                            <CircleFlag
                                height="15"
                                countryCode={location.location.country_code}
                            /></>}
                        {location.source === "Coords" && `Lat: ${location.lat}, Long: ${location.long}`}
                        {location.source === "GPS" && "GPS Location"}
                    </>
                        : "Set Location"}
            </div>
            <div style={{ display: "flex", flexDirection: "row", width: "100%", justifyContent: "space-between" }}>
                <flex-column-start>
                    <button style={{ flexDirection: "row", justifyContent: "space-evenly", width: "100%", border: "1px silver solid", borderRadius: "5px" }}
                        onClick={() => setLocation({ ...newLocation, status: "Success" })}>
                        <FaArrowRotateRight />
                        Confirm / Update
                    </button>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                        Source:
                        <select value={newLocation.source} onChange={(e) => { setNewLocation({ ...location, source: e.target.value }); setWidgetState(e.target.value) }}>
                            <option value="empty">None</option>
                            <option value="GPS">GPS</option>
                            <option value="Code">Location</option>
                            <option value="Coords">Coordinates</option>
                        </select>
                    </div>
                    <weather-search-container style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", fontSize: "16px", width: "100%" }}>
                        <FaSearch />
                        <search
                            onBlur={() => setShowSearchList(false)}
                        >
                            <input
                                ref={searchRef}
                                type="text"
                                style={{ width: "120px" }}
                                value={searchText}
                                onClick={() => setShowSearchList(true)}
                                onChange={(e) => setSearchText(e.target.value)}
                                disabled={newLocation.source !== "Code"}
                            />
                            <div
                                style={{ position: "absolute", display: "flex", flexDirection: "column", zIndex: 1, background: "black", overflowY: "scroll", maxHeight: "200px", border: "1px solid gray", visibility: searchList.length > 0 && showSearchList ? "visible" : "hidden" }}>
                                {searchList.length > 0 &&
                                    searchList.map((value, index) => (
                                        <button
                                            key={index + "weatherSearchSelect"}
                                            style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "start", fontSize: "12px", border: "1px solid gray", width: "100px" }}
                                            onClick={() => handleSearchButton(index)}
                                        >
                                            {searchList[index].name}
                                            <CircleFlag
                                                height="15"
                                                countryCode={searchList[index].country_code.toLowerCase()}
                                            />
                                        </button>
                                    ))
                                }</div>
                        </search>
                    </weather-search-container>
                </flex-column-start>
                <div style={{ display: "flex", flexDirection: "column", width: "100%", marginLeft: "10px" }}>
                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-betwen", fontSize: "14px", width: "100%", borderBottom: "1px solid gray" }}>
                        <div style={{ display: "flex", justifyContent: "start", width: "100%" }}>
                            Latitude:
                        </div>
                        <div style={{ display: "flex", justifyContent: "end", width: "100%" }}>
                            <input
                                style={{ width: "70px" }}
                                type="number"
                                value={newLocation.lat}
                                disabled={newLocation.source !== "Coords"}
                                onChange={(e) => setNewLocation({ ...newLocation, lat: e.target.value })}
                            />
                        </div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-betwen", fontSize: "14px", width: "100%", borderBottom: "1px solid gray" }}>
                        <div style={{ display: "flex", justifyContent: "start", width: "100%" }}>
                            Longitude:
                        </div>
                        <div style={{ display: "flex", justifyContent: "end", width: "100%" }}>
                            <input
                                style={{ width: "70px" }}
                                type="number"
                                value={newLocation.long}
                                disabled={newLocation.source !== "Coords"}
                                onChange={(e) => setNewLocation({ ...newLocation, long: e.target.value })}
                            />
                        </div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-betwen", fontSize: "14px", width: "100%" }}>
                        <div style={{ display: "flex", justifyContent: "start", width: "100%" }}>
                            Altitude:
                        </div>
                        <div style={{ display: "flex", justifyContent: "end", width: "100%" }}>
                            <input
                                style={{ width: "70px" }}
                                type="number"
                                value={newLocation.alt}
                                disabled={true}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <weather-map-container>
                <MapView latitude={newLocation.lat} longitude={newLocation.long} />
            </weather-map-container>
        </weather-location>
    );
}