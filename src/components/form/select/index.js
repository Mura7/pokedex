import { Select } from 'antd';
import { useEffect, useState } from 'react';
import debounce from 'lodash/debounce';

const { Option } = Select;

const SelectInput = ({ onSelect = () => {} }) => {
  const [fetching, setFetching] = useState(false);
  const [data, setData] = useState({});
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async (url = 'https://pokeapi.co/api/v2/pokemon?offset=20&limit=20') => {
    setFetching(true);
    const res = await fetch(`${url}`);
    const resData = await res.json();
    setFetching(false);
    const resultData = [...results, ...resData?.results];
    setData(resData);
    setResults(resultData);
  };

  const renderOptionList = () => {
    if (results?.length < 1) return null;
    return results.map((item, index) => {
      return (
        <Option key={`${index}option`} value={item?.name}>
          {item?.name}
        </Option>
      );
    });
  };

  const handleChange = value => {
    onSelect(value);
  };

  const onScroll = () => {
    if (data?.next && !fetching) {
      fetchData(data?.next);
    }
  };

  return (
    <Select
      style={{ width: '100%' }}
      placeholder='Select Pokemon'
      onChange={handleChange}
      onPopupScroll={debounce(onScroll, 500)}
    >
      {renderOptionList()}
      {!!fetching && <Option key='loading'>Loading...</Option>}
    </Select>
  );
};

export default SelectInput;
