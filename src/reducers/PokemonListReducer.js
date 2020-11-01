//
const defaultState = {
  loading: false,
  data: [],
  errorMessage: '',
  count: 0,
};
//
const PokemonListReducer = (state = defaultState, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'POKEMON_LIST_LOADING':
      return { ...state, loading: true, errorMessage: '' };
    case 'POKEMON_LIST_FAIL':
      return {
        ...state,
        loading: false,
        errorMessage: 'Unable to get pokemons list',
      };
    case 'POKEMON_LIST_SUCCESS':
      return {
        ...state,
        loading: false,
        errorMessage: '',
        data: payload.results,
        count: payload.count,
      };
    default:
      return state;
  }
};
//
export default PokemonListReducer;
