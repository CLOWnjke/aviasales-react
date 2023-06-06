import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setChecked, setCheckedAll } from '../../Store/filterState';
import { filterNames } from '../../utilities/filterNames';

import classes from './filters.module.scss';

const FilterList = () => {
  const dispatch = useDispatch();
  const checkedBox = useSelector((state) => state.filterReducer.checkedBox);

  const handleChange = (value) => {
    dispatch(setChecked(value));
    dispatch(setCheckedAll(value));
  };

  return (
    <>
      <ul className={classes.filter}>
        <div className={classes.title}>КОЛИЧЕСТВО ПЕРЕСАДОК</div>
        {filterNames.map(({ name }, index) => {
          return (
            <li className={classes.checkbox} key={index}>
              <label>
                <input
                  type="checkbox"
                  name={name}
                  value={name}
                  checked={checkedBox[index]}
                  onChange={() => {
                    handleChange(index);
                    console.log(checkedBox);
                  }}
                ></input>
                <span>{name}</span>
              </label>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default FilterList;
