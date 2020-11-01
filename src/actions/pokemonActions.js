//
import axios from 'axios';
//
export const getPokemonList = (page, perPage) => async (dispatch) => {
  try {
    dispatch({ type: 'POKEMON_LIST_LOADING' });
    const offset = page * perPage - perPage;
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${perPage}&offset=${offset}
    `);
    dispatch({ type: 'POKEMON_LIST_SUCCESS', payload: res.data });
  } catch (error) {
    dispatch({ type: 'POKEMON_LIST_FAIL' });
  }
};
//
export const getPokemon = (pokemon) => async (dispatch) => {
  try {
    dispatch({ type: 'POKEMON_LOADING' });
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    dispatch({
      type: 'POKEMON_SUCCESS',
      payload: { data: res.data, name: pokemon },
    });
  } catch (error) {
    dispatch({ type: 'POKEMON_FAIL' });
  }
};
