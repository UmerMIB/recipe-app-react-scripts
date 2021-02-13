import React, { useEffect, useState } from 'react';
// import { recipes as dummyData } from '../../dummyData';
import Form from '../../Components/Form';
import Recipes from './Recipes';
import axios from 'axios';
import '../../scss/Pages/Home/index.scss';

export default function App() {
	const [recipes, setRecipies] = useState([]);

	useEffect(() => {
		axios
			.get('/api')
			.then(res => {
				console.log('res', res.data);
				if (res.data.success) {
					setRecipies(res.data.data);
				}
			})
			.catch(err => {
				console.log(err.response.data);
			});
	}, []);

	const getRecipe = () => {};

	return (
		<div className="RecipeSearch">
			<Form getRecipe={getRecipe} />
			<Recipes recipes={recipes} />
		</div>
	);
}
