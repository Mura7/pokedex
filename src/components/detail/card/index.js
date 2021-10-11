import { useEffect, useState } from 'react';
import { Spin } from 'antd';
import get from 'lodash/get';

const DetailCard = ({ value = 'bulbasaur' }) => {
  const [fetching, setFetching] = useState(false);
  const [detail, setDetail] = useState({});

  useEffect(() => {
    if (value) {
      fetchData();
    }
  }, [value]);

  const fetchData = async () => {
    setFetching(true);
    const url = `https://pokeapi.co/api/v2/pokemon/${value}`;
    const res = await fetch(`${url}`);
    const data = await res.json();
    setDetail(data);
    setFetching(false);
  };

  if (fetching) return <Spin />;

  if (!value) return null;

  const getStatsValues = () => {
    let { hp, attack, defense, speed, specialAttack, specialDefense } = '';
    detail.stats.map(stat => {
      switch (stat.stat.name) {
        case 'hp':
          hp = stat['base_stat'];
          break;
        case 'attack':
          attack = stat['base_stat'];
          break;
        case 'defense':
          defense = stat['base_stat'];
          break;
        case 'speed':
          speed = stat['base_stat'];
          break;
        case 'special-attack':
          specialAttack = stat['base_stat'];
          break;
        case 'special-defense':
          specialDefense = stat['base_stat'];
          break;
        default:
          break;
      }
    });
    return { hp, attack, defense, speed, specialAttack, specialDefense };
  };

  const renderStats = () => {
    if (!detail?.stats?.length) return null;
    const { hp, attack, defense, speed, specialAttack, specialDefense } = getStatsValues();
    const stats = [
      { title: 'Health', value: hp },
      { title: 'Attack', value: attack },
      { title: 'Defense', value: defense },
      { title: 'Speed', value: speed },
      { title: 'Special Attack', value: specialAttack },
      { title: 'Special Defense', value: specialDefense }
    ];

    return stats?.map((item, index) => {
      if (item?.value) {
        return (
          <div key={`${index}-stats`} className='cardStatsItem'>
            <div className='cardStatsTitle'>{item?.title}</div>
            <div className='cardStatsValueWrapper'>
              <div className='cardStatsValue' style={{ width: `${item?.value}%` }}>
                {item?.value}
              </div>
            </div>
          </div>
        );
      }
    });
  };

  const renderTable = () => {
    const tableData = [
      {
        title: 'Type',
        value: get(detail, 'types[0].type.name')
      },
      {
        title: 'Weight',
        value: get(detail, 'weight')
      },
      {
        title: 'Height',
        value: get(detail, 'height')
      },
      {
        title: 'Number of Battles',
        value: get(detail, 'game_indices')?.length
      }
    ];

    return tableData?.map((item, index) => {
      return (
        <div key={`${index}-item`} className='cardTableItem'>
          <div className='cardTableTitle'>{item?.title}:</div>
          <div className='cardTableText'>{item?.value}</div>
        </div>
      );
    });
  };

  return (
    <div className='card'>
      <div className='cardContainer'>
        <div className='cardInfoContainer'>
          <div className='cardImageContainer'>
            <img className='cardImage' src={detail?.sprites?.front_default} />
          </div>
          <div className='cardSummary'>
            {!!value && <div className='cardTitle'>{value}</div>}
            <div className='cardTableContainer'>
              <div className='cardTable'>{renderTable()}</div>
            </div>
          </div>
        </div>
        <div className='statsContainer'>{renderStats()}</div>
      </div>
    </div>
  );
};

export default DetailCard;
