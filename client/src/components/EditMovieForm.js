import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

import axios from 'axios';

const EditMovieForm = (props) => {
	const { push } = useHistory();
	const { id } = useParams();//this will return to us an object of key/value pairs of the URL parameter ID for each movie.

	const [movie, setMovie] = useState({
		title:"",
		director: "",
		genre: "",
		metascore: 0,
		description: ""
	});
	
	const handleChange = (e) => {
        setMovie({
            ...movie,
            [e.target.name]: e.target.value
        });
    }
	//The idea with this use effect is that when the component for this specific movie mounts, we want to get all of the current information we have on the server regarding this movie and we want to fill  the editing form with this information. This will allow the user to then change the information provided. So, we put the information into our local state after the axios call so that we can then change it and send it back updated to the server. 
	useEffect(()=>{
		axios.get(`http://localhost:5001/api/movies/${id}`)
		.then(res => {
			setMovie(res.data);
		})
		.catch(err => {
			console.log(err.response);
		})
	},[id]);


	//The idea here is that we want our editted movie information to change the server state with the new local state. We also want some way for the app.js to communicate with our movies state data here. So, we pass in setMovies in as props, and when the save button is clicked we make our put call which will take our local changed state for this single movie and update the array of all our movies with the changes to this specific movie. Hence, when we go back to the home page, we will see the changes made to our movie information. I used props.setMovies because that was brought in through props. 
    const handleSubmit = (e) => {
		e.preventDefault();
		axios.put(`http://localhost:5001/api/movies/${id}`, movie)
		.then(res => {
			props.setMovies(res.data);
			push(`/movies/${id}`);
			// this push command is going to allow us to redirect the user to the updated movie information page based off of the changes made by them. This will make a better user experience for the user. 
		})
		.catch(err => {
			console.log(err);
		})
	}
	
	const { title, director, genre, metascore, description } = movie;

    return (
	<div className="col">
		<div className="modal-content">
			<form onSubmit={handleSubmit}>
				<div className="modal-header">						
					<h4 className="modal-title">Editing <strong>{movie.title}</strong></h4>
				</div>
				<div className="modal-body">					
					<div className="form-group">
						<label>Title</label>
						<input value={title} onChange={handleChange} name="title" type="text" className="form-control"/>
					</div>
					<div className="form-group">
						<label>Director</label>
						<input value={director} onChange={handleChange} name="director" type="text" className="form-control"/>
					</div>
					<div className="form-group">
						<label>Genre</label>
						<input value={genre} onChange={handleChange} name="genre" type="text" className="form-control"/>
					</div>
					<div className="form-group">
						<label>Metascore</label>
						<input value={metascore} onChange={handleChange} name="metascore" type="number" className="form-control"/>
					</div>		
					<div className="form-group">
						<label>Description</label>
						<textarea value={description} onChange={handleChange} name="description" className="form-control"></textarea>
					</div>
									
				</div>
				<div className="modal-footer">			    
					<input type="submit" className="btn btn-info" value="Save"/>
					<Link to={`/movies`}><input type="button" className="btn btn-default" value="Cancel"/></Link>
				</div>
			</form>
		</div>
	</div>);
}

export default EditMovieForm;