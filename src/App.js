import React from 'react';
import { NavLink, Route, Redirect, Switch } from 'react-router-dom';
import Pokemon from './components/Pokemon';
import PokemonList from './components/PokemonList';

const App = () => {
  return (
    <div>
      <nav>
        <NavLink to='/'>Home</NavLink>
      </nav>
      <Switch>
        <Route exact path='/' component={PokemonList} />
        <Route path='/pokemon/:pokemonName' component={Pokemon} />
        <Redirect to='/' />
      </Switch>
    </div>
  );
};

export default App;
