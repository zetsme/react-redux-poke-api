import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { getPokemon } from '../actions/pokemonActions';

const Pokemon = () => {
  const { pokemonName } = useParams();
  const dispatch = useDispatch();
  const pokemonState = useSelector((state) => state.Pokemons);
  useEffect(() => {
    dispatch(getPokemon(pokemonName));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showData = () => {
    if (!_.isEmpty(pokemonState.data[pokemonName])) {
      const pokemonData = pokemonState.data[pokemonName];
      return (
        <div className='pokemon__container'>
          <div>
            <h2>Sprites</h2>
            <img src={pokemonData.sprites.front_default} alt={pokemonName} />
            <img src={pokemonData.sprites.back_default} alt={pokemonName} />
          </div>
          <div>
            <h2>Types:</h2>
            {pokemonData.types.map((item, index) => {
              return <p key={index}>{item.type.name}</p>;
            })}
          </div>
          <div>
            <h2>Abilities</h2>
            {pokemonData.abilities.map((item, index) => {
              return <p key={index}>{item.ability.name}</p>;
            })}
          </div>
          <div>
            <h2>Stats</h2>
            {pokemonData.stats.map((item, index) => {
              return (
                <p key={index}>
                  {item.stat.name} - {item.base_stat}
                </p>
              );
            })}
          </div>
        </div>
      );
    }
    if (pokemonState.loading) return <p>Loading....</p>;
    if (pokemonState.errorMessage) return <p>{pokemonState.errorMessage}</p>;
    return <p>Can't get pokemon</p>;
  };
  return (
    <div className='pokemon'>
      <h1 className='pokemon__name'>{pokemonName}</h1>
      {showData()}
    </div>
  );
};

export default Pokemon;
