import { combineReducers } from 'redux';
import PokemonListReducer from './PokemonListReducer';
import PokemonsReducer from './PokemonsReducer';

const RootReducer = combineReducers({
  PokemonList: PokemonListReducer,
  Pokemons: PokemonsReducer,
});
export default RootReducer;
