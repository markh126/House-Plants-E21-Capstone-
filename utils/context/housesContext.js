import {
  useState, useEffect, createContext, useMemo,
} from 'react';
import { getHousesForHome } from '../../api/houseData';
import { useAuth } from './authContext';

const HousesContext = createContext();

HousesContext.displayName = 'HousesContext';

const HousesProvider = (props) => {
  const [houses, setHouses] = useState([]);
  const { user } = useAuth();

  const getAllHouses = () => {
    getHousesForHome(user.uid).then(setHouses);
  };

  useEffect(() => {
    if (user && user.uid) { getAllHouses(); }
  }, [user]);

  const value = useMemo(
    () => ({
      houses, setHouses,
    }),
    [user, houses],
  );

  return (<HousesContext.Provider value={value} {...props} />);
};

export {
  HousesProvider, HousesContext,
};
