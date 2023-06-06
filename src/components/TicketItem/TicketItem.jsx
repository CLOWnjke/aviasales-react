import React from 'react';
import { format, add } from 'date-fns';

import classes from './TicketItem.module.scss';

const TicketItem = ({ data }) => {
  const there = data.segments[0];
  const back = data.segments[1];

  const getFlightTime = (value) => {
    const hours = Math.trunc(value / 60);
    const mins = value % 60;
    return `${hours}ч ${mins}м`;
  };

  const getStopsCount = (stops) => {
    if (stops.length === 0) {
      return 'ПРЯМОЙ РЕЙС';
    } else if (stops.length === 1) {
      return '1 ПЕРЕСАДКА';
    } else if (stops.length === 2) {
      return '2 ПЕРЕСАДКИ';
    } else if (stops.length === 3) {
      return '3 ПЕРЕСАДКИ';
    }
  };

  const getDate = (date) => {
    return format(new Date(date), 'HH:mm');
  };

  const getTime = (startTime, value) => {
    const result = add(new Date(startTime), {
      minutes: value,
    });
    return result;
  };

  return (
    <div className="item">
      <div className={classes.header}>
        <div className={classes.title}>
          <div>{`${there.origin} – ${there.destination}`}</div>
          <div>В ПУТИ</div>
          <div>{getStopsCount(there.stops)}</div>
        </div>
        <div className={classes.info}>
          <div>
            <>
              {getDate(there.date.slice(0, -1))} - {getDate(getTime(there.date.slice(0, -1), there.duration))}
            </>
          </div>
          <div>{getFlightTime(there.duration)}</div>
          <div>{`${back.origin} – ${back.destination}`}</div>
        </div>
      </div>
      <div className={classes.header}>
        <div className={classes.title}>
          <div>{`${data.segments[1].origin} – ${back.destination}`}</div>
          <div>В ПУТИ</div>
          <div>{getStopsCount(back.stops)}</div>
        </div>
        <div className={classes.info}>
          <div>
            <>
              {getDate(back.date.slice(0, -1))} - {getDate(getTime(back.date.slice(0, -1), back.duration))}
            </>
          </div>
          <div>{getFlightTime(back.duration)}</div>
          <div>{`${back.origin} – ${back.stops.join(', ')}`}</div>
        </div>
      </div>
    </div>
  );
};

export default TicketItem;
