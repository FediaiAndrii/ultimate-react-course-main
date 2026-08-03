import { createContext, useCallback, useContext, useReducer } from "react";

import citiesData from "../../data/cities.json";

const CitiesContext = createContext();

const initialState = {
  cities: citiesData.cities,
  isLoading: false,
  currentCity: {},
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "cities/loaded":
      return {
        ...state,
        isLoading: false,
        cities: action.payload,
      };
    case "city/loaded":
      return { ...state, isLoading: false, currentCity: action.payload };

    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };

    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter(city => city.id !== action.payload),
        currentCity: {},
      };

    case "rejected":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      throw new Error("Unknown action type");
  }
}

function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
    reducer,
    initialState,
  );

  const getCity = useCallback(
    function getCity(id) {
      if (String(id) === String(currentCity.id)) return;

      dispatch({ type: "loading" });

      const city = cities.find(c => String(c.id) === String(id));

      if (city) {
        dispatch({ type: "city/loaded", payload: city });
      } else {
        dispatch({
          type: "rejected",
          payload: "There was an error loading the city...",
        });
      }
    },
    [currentCity.id, cities],
  );

  function createCity(newCity) {
    dispatch({ type: "loading" });

    const newCityWithId = {
      ...newCity,
      id: crypto.randomUUID(),
    };

    dispatch({ type: "city/created", payload: newCityWithId });
  }

  function deleteCity(id) {
    dispatch({ type: "loading" });

    dispatch({ type: "city/deleted", payload: id });
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        error,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("CitiesContext was used outside CitiesProvider");
  return context;
}

export { CitiesProvider, useCities };
