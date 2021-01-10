import React, { useState, createContext } from "react";

import Geocode from "react-geocode";

export const SiteContext = createContext();
export const DiveSitesContext = createContext();
export const CoordsContext = createContext();
export const LoadDiveSiteContext = createContext();
export const DetailsContext = createContext();
export const LoadDiveSiteInBoundsContext = createContext();

export const DiveShopsContext = createContext();
export const LoadDiveShopsInBoundsContext = createContext();
export const ShopContext = createContext();

export const GeoAreaContext = createContext();

export const ScubaFilterContext = createContext();
export const SnorkelFilterContext = createContext();

export const LoadDiveSitesInBoundsInfiniteContext = createContext();

export const PanelDiveSitesContext = createContext();

export const ScrollCounterContext = createContext();
export const HasMoreDataContext = createContext();

export const DiveSiteProvider = (props) => {
  const [selectedSite, setSelectedSite] = useState(null);

  const [diveSites, setDiveSites] = useState([]);

  const [panelDiveSites, setPanelDiveSites] = useState([]);

  const [diveShops, setDiveShops] = useState([]);

  const [selectedShop, setSelectedShop] = useState(null);

  const [geoArea, setGeoArea] = useState({
    area: "",
    state: "",
  });

  const [coords, setCoords] = useState({
    lat: "",
    lng: "",
  });

  const [locationName, setLocationName] = useState("");

  const [scubaFilter, setScubaFilter] = useState(false);
  const [snorkelFilter, setSnorkelFilter] = useState(false);

  const [scrollCounter, setScrollCounter] = useState(0);
  const [hasMoreData, setHasMoreData] = useState(true);

  async function loadDiveSites() {
    // You can await here
    //setDiveSites([]);
    console.log("IN LOAD DIVE SITE");
    const response = await fetch("http://localhost:8080/diveSites/getSites", {
      method: "GET",
    });
    const data = await response.json();
    const sites = data.site;
    setDiveSites(sites);
    return true;
    // ...
  }

  async function loadDiveSitesInBoundsInfinite(mapBounds, mapMoved) {
    // You can await here
    //setDiveSites([]);
    console.log("loadDiveSitesInBoundsInfinite");
    //console.log(scrollCounter);

    let counter;
    let panelSites;

    console.log("Map Moved: " + mapMoved);

    if (mapMoved == "TRUE") {
      counter = 0;
      panelSites = [];
    } else {
      counter = scrollCounter;
      panelSites = panelDiveSites;
    }

    console.log("COUNTER = " + counter);

    const swLat = mapBounds.Wa.i;
    const neLat = mapBounds.Wa.j;

    let swLng;
    let neLng;

    if (mapBounds.Qa) {
      console.log("In MapBounds Qa");
      swLng = mapBounds.Qa.i;
      neLng = mapBounds.Qa.j;
    } else if (mapBounds.Ra) {
      console.log("In Mapbounds Ra");
      swLng = mapBounds.Ra.i;
      neLng = mapBounds.Ra.j;
    }

    return fetch(
      "http://localhost:8080/diveSites/loadDiveSitesInBoundsInfinite",
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          swLat: swLat,
          swLng: swLng,
          neLat: neLat,
          neLng: neLng,
          scubaFilter: scubaFilter,
          snorkelFilter: snorkelFilter,
          scrollCounter: counter,
        }),
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        console.log(result.sites);
        console.log("Results Length => " + result.sites.length);
        console.log("Panel Dive Sites Length => " + panelSites.length);

        if (result.sites.length == 0) {
          setHasMoreData(false);
          setScrollCounter(0);
        } else if (result.sites.length < 10 && panelSites.length == 0) {
          setPanelDiveSites(result.sites);
          setHasMoreData(false);
          setScrollCounter(0);
        } else {
          if (mapMoved == "TRUE") {
            setPanelDiveSites(result.sites);
            setScrollCounter(1);
          } else {
            setPanelDiveSites((prevArray) => [...prevArray, ...result.sites]);
            setScrollCounter(scrollCounter + 1);
          }
        }
      })
      .catch((err) => {
        console.log("Caught.");
        console.log(err);
      });
  }

  async function loadDiveSitesInBounds(mapBounds, setGlobalLoader) {
    // You can await here
    setDiveSites([]);
    console.log("loadDiveSitesInBounds");

    const swLat = mapBounds.Wa.i;
    const neLat = mapBounds.Wa.j;

    let swLng;
    let neLng;

    if (mapBounds.Qa) {
      console.log("In MapBounds Qa");
      swLng = mapBounds.Qa.i;
      neLng = mapBounds.Qa.j;
    } else if (mapBounds.Ra) {
      console.log("In Mapbounds Ra");
      swLng = mapBounds.Ra.i;
      neLng = mapBounds.Ra.j;
    }

    return fetch("http://localhost:8080/diveSites/loadDiveSitesInBounds", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        swLat: swLat,
        swLng: swLng,
        neLat: neLat,
        neLng: neLng,
        scubaFilter: scubaFilter,
        snorkelFilter: snorkelFilter,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        //console.log(result.sites);
        setDiveSites(result.sites);
        setGlobalLoader((prevState) => ({
          ...prevState,
          divesites: false,
        }));

        //*GET LOCATION NAME

        if (swLng - neLng > 180 || neLng - swLng > 180) {
          swLng += 360;
          swLng %= 360;
          neLng += 360;
          neLng %= 360;
        }

        const centerLat = (swLat + neLat) / 2;
        const centerLng = (swLng + neLng) / 2;

        //* USE THIS FOR COMMUNITY PHOTOS SECTION

        let areaName = "";
        let stateName = "";

        Geocode.setApiKey("AIzaSyAWZiRAil_IM3HX-FzHeZetG7zJpQB3B4Q");

        Geocode.fromLatLng(centerLat, centerLng).then(
          (response) => {
            console.log(response);
            if (response.results != []) {
              if (response.results[0].address_components.length > 2) {
                if (response.results[0].address_components[2]) {
                  areaName =
                    response.results[0].address_components[2].long_name;
                }
                if (response.results[0].address_components[4]) {
                  stateName =
                    response.results[0].address_components[4].long_name;
                }
                setGeoArea({
                  area: areaName,
                  state: stateName,
                });
              }
            }

            // console.log(areaName);
            // console.log(stateName);
          },
          (error) => {
            console.error(error);
          }
        );
      })
      .catch((err) => {
        console.log("Caught.");
        console.log(err);
      });
  }

  async function loadDiveShopsInBounds(mapBounds, setGlobalLoader) {
    // You can await here
    console.log("loadDiveShopsInBounds");
    console.log(mapBounds);

    const swLat = mapBounds.Wa.i;
    const neLat = mapBounds.Wa.j;

    let swLng;
    let neLng;

    if (mapBounds.Qa) {
      console.log("In MapBounds Qa");
      swLng = mapBounds.Qa.i;
      neLng = mapBounds.Qa.j;
    } else if (mapBounds.Ra) {
      console.log("In Mapbounds Ra");
      swLng = mapBounds.Ra.i;
      neLng = mapBounds.Ra.j;
    }

    return fetch("http://localhost:8080/diveShops/loadDiveShopsInBounds", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        swLat: swLat,
        swLng: swLng,
        neLat: neLat,
        neLng: neLng,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        console.log(result.shops);
        setDiveShops(result.shops);
        setGlobalLoader((prevState) => ({
          ...prevState,
          diveshops: false,
        }));
      })
      .catch((err) => {
        console.log("Caught.");
        console.log(err);
      });
  }

  return (
    <SiteContext.Provider value={[selectedSite, setSelectedSite]}>
      <DiveSitesContext.Provider value={[diveSites, setDiveSites]}>
        <CoordsContext.Provider value={[coords, setCoords]}>
          <LoadDiveSiteContext.Provider value={loadDiveSites}>
            <LoadDiveSiteInBoundsContext.Provider value={loadDiveSitesInBounds}>
              <LoadDiveShopsInBoundsContext.Provider
                value={loadDiveShopsInBounds}
              >
                <DiveShopsContext.Provider value={[diveShops, setDiveShops]}>
                  <ShopContext.Provider value={[selectedShop, setSelectedShop]}>
                    <GeoAreaContext.Provider value={[geoArea, setGeoArea]}>
                      <ScubaFilterContext.Provider
                        value={[scubaFilter, setScubaFilter]}
                      >
                        <SnorkelFilterContext.Provider
                          value={[snorkelFilter, setSnorkelFilter]}
                        >
                          <LoadDiveSitesInBoundsInfiniteContext.Provider
                            value={loadDiveSitesInBoundsInfinite}
                          >
                            <PanelDiveSitesContext.Provider
                              value={[panelDiveSites, setPanelDiveSites]}
                            >
                              <ScrollCounterContext.Provider
                                value={[scrollCounter, setScrollCounter]}
                              >
                                <HasMoreDataContext.Provider
                                  value={[hasMoreData, setHasMoreData]}
                                >
                                  {props.children}
                                </HasMoreDataContext.Provider>
                              </ScrollCounterContext.Provider>
                            </PanelDiveSitesContext.Provider>
                          </LoadDiveSitesInBoundsInfiniteContext.Provider>
                        </SnorkelFilterContext.Provider>
                      </ScubaFilterContext.Provider>
                    </GeoAreaContext.Provider>
                  </ShopContext.Provider>
                </DiveShopsContext.Provider>
              </LoadDiveShopsInBoundsContext.Provider>
            </LoadDiveSiteInBoundsContext.Provider>
          </LoadDiveSiteContext.Provider>
        </CoordsContext.Provider>
      </DiveSitesContext.Provider>
    </SiteContext.Provider>
  );
};
