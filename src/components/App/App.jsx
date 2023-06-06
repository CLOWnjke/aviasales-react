import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BarLoader from 'react-spinners/BarLoader';

import Logo from '../../img/Logo.svg';
import FilterList from '../filters/filters';
import Tabs from '../Tabs/Tabs';
import TicketList from '../TicketList/TicketList';
import ButtonMore from '../ButtonMore/ButtonMore';
import { thunkSearchId, fetchTicket, removeAlert } from '../../Store/TicketList';

import classes from './App.module.scss';

const App = () => {
  const dispatch = useDispatch();
  const checkedBox = useSelector((state) => state.filterReducer.checkedBox);
  const status = useSelector((state) => state.sliceTickets.status);

  useEffect(() => {
    dispatch(thunkSearchId())
      .then((action) => {
        dispatch(fetchTicket(action.payload));
      })
      .catch((e) => console.log(e));
  }, []);

  useEffect(() => {
    if (status === 'resolved') {
      setTimeout(() => {
        dispatch(removeAlert());
      }, 2000);
    }
  });

  const emptyList = checkedBox.some((el) => el === true) ? (
    <ButtonMore />
  ) : (
    <div className={classes.loading}>Рейсов, подходящих под заданные фильтры, не найдено</div>
  );

  return (
    <div className={classes.app}>
      <img src={Logo} alt="Aviasales Logo" className={classes.img}></img>
      <div className={classes.wrapper}>
        <FilterList />
        <div className={classes.main}>
          <Tabs />
          {status === 'loading' && (
            <>
              <div className={classes.loading}>Остальные билеты подгружаются...</div>
              <BarLoader
                color={'#2196f3'}
                loading={true}
                height={4}
                width={502}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </>
          )}
          <TicketList />
          {emptyList}
        </div>
      </div>
    </div>
  );
};

export default App;
