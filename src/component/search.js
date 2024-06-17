import {useRef, useEffect, useState} from "react";
import Googlemap from "./googlemap";
import {useDispatch, useSelector} from "react-redux";
import {saveSearch} from "./searchSlice";

const Search = () => {
    const [position, setPosition]  = useState();
    const [zoom, setZoom]  = useState();
    const autoCompleteRef = useRef();
    const inputRef = useRef();
    const options = {
        componentRestrictions: {country: "my"},
        fields: ["address_components", "geometry", "name"],
        types: ["establishment"]
    };
    const dispatch = useDispatch();
    const locations = useSelector((state) => state.search.value);
    const locationsType = useSelector((state) => state.search.type);
    const loadLocations = (locations, locationsType) => {
        let content = [];
        for (let i = locations.length-1; i >= 0; i--) {
            const location = locations[i];
            let locationClass = locationsType[i] === 1? 'searching': 'searched';
            content.push(<li key={i+1} title={location} className={locationClass}>{(locationsType[i] === 2? 'SELECTED: ': '')}{location}</li>);
        }
        if(locations.length === 0){
            let noResult = 'No result.';
            content.push(<li key={0} title={noResult}>{noResult}</li>);
        }
        return content;
    };

    function searchChanged(e){
        if(e.target.value) {
            let location = {
                type: 1,
                value: e.target.value
            };
            dispatch(saveSearch(location));
        }
    }

    useEffect(() => {
        try {
            autoCompleteRef.current = new window.google.maps.places.Autocomplete(
              inputRef.current,
              options
            );
            autoCompleteRef.current.addListener("place_changed", async function () {
                const place = await autoCompleteRef.current.getPlace();
                const selectedLocation = place.geometry?.location;
                if(selectedLocation) {
                    setPosition({lat: selectedLocation.lat(), lng: selectedLocation.lng()});
                    setZoom(18);
                    if (document.getElementById('searchLocation')) {
                        let location = {
                            type: 2,
                            value: document.getElementById('searchLocation').value
                        };
                        dispatch(saveSearch(location));
                    }
                }
            });
        } catch(err) {

        }
    }, []);
    return (
        <div className="row">
            <div className="col-3 pt-2 left-panel">
                <div className="pt-2 pb-3">
                    <span className="title">SEOW KOK WENG</span><br/>
                    <span className="sub-title">Google Place Autocomplete<br/>My React App</span>
                </div>
                <div className="col-12">
                    <input id="searchLocation" type="text" className="form-control" placeholder="Search Location" ref={inputRef} onInput={searchChanged}  />
                </div>
                <br/>
                <div className="col-12">
                    <div className="card search-history">
                        <div className="card-header">
                            Search History (Maximum 10 results)
                        </div>
                        <ul className="list-group list-group-flush">
                            {loadLocations(locations, locationsType)}
                        </ul>
                    </div>
                </div>
            </div>
            <div className="col-9">
                <Googlemap position={position} zoom={zoom}/>
            </div>
        </div>
    );
};
export default Search;