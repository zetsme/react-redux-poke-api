import React from 'react';
import { NavLink, Route, Redirect, Switch } from 'react-router-dom';
import Pokemon from './components/Pokemon';
import PokemonList from './components/PokemonList';

const App = () => {
  return (
    <>
      <nav className='nav'>
        <div className='nav__container'>
          <NavLink to='/'>
            <img
              src='http://pngimg.com/uploads/pokeball/pokeball_PNG32.png'
              alt=''
            />
            Home
          </NavLink>
        </div>
      </nav>
      <div className='container'>
        <Switch>
          <Route exact path='/' component={PokemonList} />
          <Route path='/pokemon/:pokemonName' component={Pokemon} />
          <Redirect to='/' />
        </Switch>
      </div>
    </>
  );
};

export default App;
