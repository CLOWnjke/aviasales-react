import React from 'react';
import { useSelector } from 'react-redux';

import Ticket from '../Ticket/Ticket';

const TicketList = () => {
  const data = useSelector((state) => state.sliceTickets.data);
  const slice = useSelector((state) => state.sliceTickets.slice);
  const checkedBox = useSelector((state) => state.filterReducer.checkedBox);

  const cheapest = useSelector((state) => state.filterReducer.cheapest);
  const fast = useSelector((state) => state.filterReducer.fast);
  const optimal = useSelector((state) => state.filterReducer.optimal);

  const dataCopy = JSON.parse(JSON.stringify(data));

  const getFilters = (a, b) => {
    if (cheapest) {
      if (a.price && b.price) return a.price - b.price;
    }
    if (fast) {
      if (a.segments[0].duration && a.segments[1].duration && b.segments[0].duration && b.segments[1].duration)
        return a.segments[0].duration + a.segments[1].duration - (b.segments[0].duration + b.segments[1].duration);
    }
    if (optimal) {
      if (a.segments[0].stops.length && b.segments[0].stops.length)
        return a.segments[0].stops.length - b.segments[0].stops.length;
    }
  };

  const filter = (arr) => {
    const filteredArr = [];

    if (checkedBox[0]) return arr;
    else {
      checkedBox.slice(1, 5).forEach((item, index) => {
        if (item) {
          const midArr = arr.filter(
            (ticket) => ticket.segments[0].stops.length === index || ticket.segments[1].stops.length === index
          );
          filteredArr.push([...midArr]);
        }
      });
    }
    return [...filteredArr].flat();
  };

  const filtredData = filter(dataCopy).sort(getFilters);

  const uniqueData = new Set(filtredData);
  const renderData = Array.from(uniqueData);

  return (
    <>
      {renderData.slice(0, slice).map((item, index) => {
        return <Ticket key={index} item={item} />;
      })}
    </>
  );
};

export default TicketList;
