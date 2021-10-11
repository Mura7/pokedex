import { Table, Tag, Space } from 'antd';
import { useEffect, useState } from 'react';
import Select from '../src/components/form/select';
import Card from '../src/components/detail/card';

const List = () => {
  const [selectedValue, setSelectedValue] = useState('bulbasaur');

  const onSelect = value => {
    setSelectedValue(value);
  };

  return (
    <div className='listContainer'>
      <div className='listContent'>
        <Select onSelect={onSelect} />
        <Card value={selectedValue} />
      </div>
    </div>
  );
};

export default List;
