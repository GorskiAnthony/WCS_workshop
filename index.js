// Etape 1 on import express et on lcréer notre const PORT
const express = require("express");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 8080;

// Etape 3 on créer des datas
// Un exemple de data
// const exemples = [
//     {
//         id: 1,
//         name: "html"
//     }
// ]

const languages = [
	{
		id: 15,
		name: "html",
	},
	{
		id: 16,
		name: "css",
	},
	{
		id: 17,
		name: "react",
	},
	{
		id: 18,
		name: "node",
	},
	{
		id: 20,
		name: "express",
	},
];

// Etape 4 afficher un resultat sur /
app.get("/", (req, res) => {
	res.send("Coucou");
});

// Etape 6 afficher un resultat sur /languages
app.get("/languages", (req, res) => {
	// methode 1
	// const limit = req.query.limit;

	// methode 2
	const { limit, name } = req.query;

	// on filtre les languages selon la query limit
	if (limit) {
		// const filterLanguage = languages.filter((el) => el.id <= limit);
		const filterLanguage = languages.filter((el, i) => i < limit);
		res.send(filterLanguage);
		// res.send(languages.splice(0, limit));
	} else if (name) {
		const filterLanguage = languages.find(
			(language) => language.name === name
		);
		filterLanguage ? res.send(filterLanguage) : res.sendStatus(404);
	} else {
		res.send(languages);
	}
});

// Afficher uniquement un language si on indique son id dans l'url
app.get("/language/:id", (req, res) => {
	const { id } = req.params;
	const language = languages.find((e) => e.id === parseInt(id));
	language ? res.send(language) : res.sendStatus(404);
});

// Etape 2, on initialise notre server
app.listen(PORT, (err) => {
	if (err) {
		console.error("There is an error");
	} else {
		console.log(`Server is working on ${PORT}`);
	}
});
