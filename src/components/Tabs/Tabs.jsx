import { Button, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { setCheapest, setFast, setOptimal } from '../../Store/filterState';

import classes from './Tabs.module.scss';
const Tabs = () => {
  const dispatch = useDispatch();

  const cheapSort = useSelector((state) => state.filterReducer.cheapest);
  const fastSort = useSelector((state) => state.filterReducer.fast);
  const optimalSort = useSelector((state) => state.filterReducer.optimal);

  const clasSheapest = cheapSort ? `${classes.button} ${classes.active}` : `${classes.button}`;
  const clasFast = fastSort ? `${classes.button} ${classes.active}` : `${classes.button}`;
  const clasOptimal = optimalSort ? `${classes.button} ${classes.active}` : `${classes.button}`;

  const handleCheapClick = () => {
    dispatch(setCheapest());
  };

  const handleFastClick = () => {
    dispatch(setFast());
  };

  const handleOptimalClick = () => {
    dispatch(setOptimal());
  };

  return (
    <>
      <Space.Compact>
        <Button className={clasSheapest} onClick={handleCheapClick}>
          САМЫЙ ДЕШЁВЫЙ
        </Button>
        <Button className={clasFast} onClick={handleFastClick}>
          САМЫЙ БЫСТРЫЙ
        </Button>
        <Button className={clasOptimal} onClick={handleOptimalClick}>
          ОПТИМАЛЬНЫЙ
        </Button>
      </Space.Compact>
    </>
  );
};
export default Tabs;
