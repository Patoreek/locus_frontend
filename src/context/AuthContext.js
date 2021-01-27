import React, { useState, createContext, useRef, useCallback } from "react";

export const AuthContext = createContext();

export const AccountContext = createContext();

export const LoadingContext = createContext();

export const UserOnMapContext = createContext();

export const FavButtonContext = createContext();

export const RemoveFavContext = createContext();

export const FavouritesContext = createContext();

export const GetFavouritesContext = createContext();

export const PanelSizeContext = createContext();

export const MapSizeContext = createContext();

export const SearchCoordsContext = createContext();

export const LocateButtonContext = createContext();

//* V1.1 Updates

export const AuthDrawerContext = createContext();

export const AuthDrawerHandlerContext = createContext();

export const NavbarContext = createContext();

export const SignUpSuccessContext = createContext();

export const LocationNameContext = createContext();

//TODO: SEARCHBAR MAP FUNCTIONS AND REF

export const MapRefContext = createContext();

export const OnMapLoadContext = createContext();

export const PanToContext = createContext();

export const SearchValueContext = createContext();

//* GLOBAL LOADER
export const GlobalLoaderContext = createContext();

export const ShowWelcomeContext = createContext();

export const AuthProvider = (props) => {
  const [isAuth, setIsAuth] = useState(false);

  const [account, setAccount] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  const [isUserOnMap, setIsUserOnMap] = useState(false); // Add

  const [favButton, setFavButton] = useState(true);

  const [favourites, setFavourites] = useState(null);

  const [panelSize, setPanelSize] = useState("30vw");

  const [mapSize, setMapSize] = useState("70vw"); // 70vw

  const [locateButtonStyle, setLocateButtonStyle] = useState({
    left: "80vw",
    display: null,
  });

  const [searchCoordinates, setSearchCoordinates] = useState({
    lat: null,
    lng: null,
  });

  //* V1.1 Updates

  const [authDrawer, setAuthDrawer] = useState({
    open: false,
    login: false,
    signup: false,
    forgotPW: false,
  });

  const authDrawerHandler = (option) => {
    if (option === "login") {
      setAuthDrawer({
        open: true,
        login: true,
        signup: false,
        forgotPW: false,
      });
    } else if (option === "signup") {
      setAuthDrawer({
        open: true,
        login: false,
        signup: true,
        forgotPW: false,
      });
    } else if (option === "forgotPw") {
      setAuthDrawer({
        open: true,
        login: false,
        signup: false,
        forgotPw: true,
      });
    }
  };

  const [showWelcome, setShowWelcome] = useState(false);

  const [navbar, setNavbar] = useState("main");

  const [signUpSuccess, setSignUpSuccess] = useState(null);

  const [locationName, setLocationName] = useState();

  const [searchValue, setSearchValue] = useState("");

  const [globalLoader, setGlobalLoader] = useState({
    //* TRUE = is currently loading || FALSE = is done loading
    divesites: false,
    diveshops: false,
  });

  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    //mapRef.current.setZoom(14);
  }, []);

  async function getFavourites(setIsLoading) {
    try {
      const response = await fetch(
        process.env.REACT_APP_ENV == "production"
          ? "/api/user/getFavourites"
          : process.env.REACT_APP_LOCAL_BACKEND + "user/getFavourites",
        {
          method: "GET",
          credentials: "include",
        }
      );
      const favourites = await response.json();

      setFavourites(favourites.favSites);
      if (setIsLoading != null) {
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(null);
    }
  }

  return (
    <AuthContext.Provider value={[isAuth, setIsAuth]}>
      <AccountContext.Provider value={[account, setAccount]}>
        <LoadingContext.Provider value={[isLoading, setIsLoading]}>
          <UserOnMapContext.Provider value={[isUserOnMap, setIsUserOnMap]}>
            <FavButtonContext.Provider value={[favButton, setFavButton]}>
              <FavouritesContext.Provider value={[favourites, setFavourites]}>
                <MapSizeContext.Provider value={[mapSize, setMapSize]}>
                  <PanelSizeContext.Provider value={[panelSize, setPanelSize]}>
                    <GetFavouritesContext.Provider value={getFavourites}>
                      <SearchCoordsContext.Provider
                        value={[searchCoordinates, setSearchCoordinates]}
                      >
                        <LocateButtonContext.Provider
                          value={[locateButtonStyle, setLocateButtonStyle]}
                        >
                          <AuthDrawerContext.Provider
                            value={[authDrawer, setAuthDrawer]}
                          >
                            <AuthDrawerHandlerContext.Provider
                              value={authDrawerHandler}
                            >
                              <NavbarContext.Provider
                                value={[navbar, setNavbar]}
                              >
                                <MapRefContext.Provider value={mapRef}>
                                  <OnMapLoadContext.Provider value={onMapLoad}>
                                    <PanToContext.Provider value={panTo}>
                                      <SignUpSuccessContext.Provider
                                        value={[
                                          signUpSuccess,
                                          setSignUpSuccess,
                                        ]}
                                      >
                                        <LocationNameContext.Provider
                                          value={[
                                            locationName,
                                            setLocationName,
                                          ]}
                                        >
                                          <SearchValueContext.Provider
                                            value={[
                                              searchValue,
                                              setSearchValue,
                                            ]}
                                          >
                                            <GlobalLoaderContext.Provider
                                              value={[
                                                globalLoader,
                                                setGlobalLoader,
                                              ]}
                                            >
                                              <ShowWelcomeContext.Provider
                                                value={[
                                                  showWelcome,
                                                  setShowWelcome,
                                                ]}
                                              >
                                                {props.children}
                                              </ShowWelcomeContext.Provider>
                                            </GlobalLoaderContext.Provider>
                                          </SearchValueContext.Provider>
                                        </LocationNameContext.Provider>
                                      </SignUpSuccessContext.Provider>
                                    </PanToContext.Provider>
                                  </OnMapLoadContext.Provider>
                                </MapRefContext.Provider>
                              </NavbarContext.Provider>
                            </AuthDrawerHandlerContext.Provider>
                          </AuthDrawerContext.Provider>
                        </LocateButtonContext.Provider>
                      </SearchCoordsContext.Provider>
                    </GetFavouritesContext.Provider>
                  </PanelSizeContext.Provider>
                </MapSizeContext.Provider>
              </FavouritesContext.Provider>
            </FavButtonContext.Provider>
          </UserOnMapContext.Provider>
        </LoadingContext.Provider>
      </AccountContext.Provider>
    </AuthContext.Provider>
  );
};
