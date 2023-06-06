import { Button, Space } from 'antd';
import { useDispatch } from 'react-redux';

import { addFiveTickets } from '../../Store/TicketList';

import classes from './ButtonMore.module.scss';

const ButtonMore = () => {
  const dispatch = useDispatch();
  const handeClick = () => {
    dispatch(addFiveTickets());
  };

  const clas = `${classes.button} ${classes.active}`;
  return (
    <>
      <Space.Compact>
        <Button className={clas} onClick={handeClick}>
          ПОКАЗАТЬ ЕЩЁ 5 БИЛЕТОВ!
        </Button>
      </Space.Compact>
    </>
  );
};
export default ButtonMore;
