import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPokemonList } from '../actions/pokemonActions';
import _ from 'lodash';
import { Link, useHistory } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

const PokemonList = () => {
  const history = useHistory();
  const [perPage, setPerPage] = useState(15);
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();
  const pokemonList = useSelector((state) => state.PokemonList);
  useEffect(() => {
    fetchData(1, perPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [perPage]);
  const fetchData = (page = 1, perPage) => {
    dispatch(getPokemonList(page, perPage));
  };

  const ShowData = () => {
    if (pokemonList.loading) return <p>Loading....</p>;
    if (!_.isEmpty(pokemonList.data)) {
      return (
        <div className='pokemon__list'>
          {pokemonList.data.map((item, index) => {
            return (
              <div key={index} className='pokemon__item'>
                <p>{item.name}</p>
                <Link to={`/pokemon/${item.name}`}>View More</Link>
              </div>
            );
          })}
        </div>
      );
    }
    if (pokemonList.errorMessage) return <p>{pokemonList.errorMessage}</p>;
    return <p>unable to get data</p>;
  };
  return (
    <div>
      <div className='search__container'>
        <label>
          Search
          <input
            type='text'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button onClick={() => history.push(`/pokemon/${search}`)}>
            Find Pokemon
          </button>
        </label>
      </div>
      <div className='perPage__container'>
        <label>
          Per Page
          <input
            type='number'
            value={perPage}
            onChange={(e) => setPerPage(e.target.value)}
          />
        </label>
      </div>
      {ShowData()}
      {!_.isEmpty(pokemonList.data) && (
        <ReactPaginate
          pageCount={Math.ceil(pokemonList.count / perPage)}
          pageRangeDisplayed={2}
          marginPagesDisplayed={1}
          containerClassName='pagination'
          onPageChange={(data) => fetchData(data.selected + 1, perPage)}
        />
      )}
    </div>
  );
};

export default PokemonList;
