import React from 'react';

import TicketItem from '../TicketItem/TicketItem';

import classes from './Ticket.module.scss';

const Ticket = ({ item }) => {
  const getPrice = (price) => {
    if (price.toString().length === 6) {
      return `${price.toString().slice(0, 3)} ${price.toString().slice(2, 6)} Р`;
    } else {
      return `${price.toString().slice(0, 2)} ${price.toString().slice(2, 5)} Р`;
    }
  };

  return (
    <>
      <div className={classes.ticket} key={item.date}>
        <div className={classes.header}>
          <div className={classes.price}>{getPrice(item.price)}</div>
          <img src={`https://pics.avs.io/99/36/${item.carrier}.png`} alt="Company Logo"></img>
        </div>
        <TicketItem data={item} />
      </div>
    </>
  );
};

export default Ticket;
