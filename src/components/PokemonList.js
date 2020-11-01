import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPokemonList } from '../actions/pokemonActions';
import _ from 'lodash';
import { Link, useHistory } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

const PokemonList = () => {
  const history = useHistory();
  const [width, setWidth] = useState(window.innerWidth);
  const [perPage, setPerPage] = useState(window.innerWidth > 768 ? 15 : 12);
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();
  const pokemonList = useSelector((state) => state.PokemonList);
  useEffect(() => {
    fetchData(1, perPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [perPage]);
  const handlePerPage = (e) => {
    e.target.value <= 1 ? setPerPage(1) : setPerPage(e.target.value);
  };
  const changeWindowWidth = () => setWidth(window.innerWidth);
  useEffect(() => {
    window.addEventListener('resize', changeWindowWidth);
    return () => window.removeEventListener('resize', changeWindowWidth);
  }, []);
  const fetchData = (page = 1, perPage) => {
    dispatch(getPokemonList(page, perPage));
  };

  const ShowData = () => {
    if (pokemonList.loading) return <p>Loading....</p>;
    if (!_.isEmpty(pokemonList.data)) {
      return (
        <div className='pokemon__list'>
          <p>Click on pokemon name to view more</p>
          {pokemonList.data.map((item, index) => {
            return (
              <div key={index} className='pokemon__item'>
                <Link to={`/pokemon/${item.name}`}>{item.name}</Link>
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
        <input
          className='search__input'
          type='text'
          value={search}
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
          placeholder='Enter pokemon name'
        />
        <button
          className='search__btn'
          onClick={() => history.push(`/pokemon/${search}`)}
        >
          Find Pokemon
        </button>
      </div>
      <div className='perPage__container'>
        {!_.isEmpty(pokemonList.data) && (
          <ReactPaginate
            pageCount={Math.ceil(pokemonList.count / perPage)}
            previousLabel={'<'}
            nextLabel={'>'}
            pageRangeDisplayed={2}
            marginPagesDisplayed={1}
            containerClassName='pagination'
            activeLinkClassName='pagination__active'
            onPageChange={(data) => fetchData(data.selected + 1, perPage)}
          />
        )}
        {width >= 768 && (
          <label>
            Pokemons per page
            <input type='number' value={perPage} onChange={handlePerPage} />
          </label>
        )}
      </div>
      {ShowData()}
    </div>
  );
};

export default PokemonList;
