import React, { useEffect, useState } from "react";

import { Route, Switch, Redirect } from "react-router-dom";
import MovieList from './components/MovieList';
import Movie from './components/Movie';

import MovieHeader from './components/MovieHeader';

import EditMovieForm from './components/EditMovieForm';
import FavoriteMovieList from './components/FavoriteMovieList';
import AddMovieForm from "./components/AddMovieForm";

import axios from 'axios';

const App = (props) => {
  const [movies, setMovies] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(()=>{
    axios.get('http://localhost:5001/api/movies')
      .then(res => {
        setMovies(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);


  //the below function is going to set our state for movies by taking in the array of movies, filter though them, and creating a new array of all of the movies that do not have the same id that has been passed through. Hence, effectively deleting the movie with said id as we want this button to do. And, we are going to pass this, as props, to
  const deleteMovie = (id)=> {
    setMovies(movies.filter(item => (item.id!== Number(id))));
  }

  const addToFavorites = (movie) => {
    
  }

  return (
    <div>
      <nav className="navbar navbar-dark bg-dark">
        <span className="navbar-brand" ><img width="40px" alt="" src="./Lambda-Logo-Red.png"/> HTTP / CRUD Module Project</span>
      </nav>

      <div className="container">
        <MovieHeader/>
        <div className="row ">
          <FavoriteMovieList favoriteMovies={favoriteMovies}/>
        
          <Switch>
            <Route path="/movies/add/">
              <AddMovieForm setMovies={setMovies}/>
            </Route>
            <Route path="/movies/edit/:id">
              {/* We want this route to get into our EditMovieForm Component, so, we need to call the component here. */}
              <EditMovieForm setMovies={setMovies}/>
            </Route>

            <Route path="/movies/:id">
              <Movie deleteMovie={deleteMovie}/>
            </Route>

            <Route path="/movies">
              <MovieList movies={movies}/>
            </Route>

            <Route path="/">
              <Redirect to="/movies"/>
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  );
};


export default App;

