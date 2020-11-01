//
const defaultState = {
  loading: false,
  data: {},
  errorMessage: '',
};
//
const PokemonsReducer = (state = defaultState, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'POKEMON_LOADING':
      return {
        ...state,
        loading: true,
        errorMessage: '',
      };
    case 'POKEMON_FAIL':
      return {
        ...state,
        loading: false,
        errorMessage: 'Fail to load Pokemon data',
      };
    case 'POKEMON_SUCCESS':
      return {
        ...state,
        loading: false,
        errorMessage: '',
        data: {
          ...state.data,
          [payload.name]: payload.data,
        },
      };
    default:
      return state;
  }
};
//
export default PokemonsReducer;
