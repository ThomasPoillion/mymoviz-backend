var express = require('express');
var router = express.Router();
var fetch = require('node-fetch');
require('dotenv').config(); // Charger les variables d’environnement

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_DISCOVER_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&language=fr-FR`;

router.get('/movies', async (req, res) => {
    try {
        if (!TMDB_API_KEY) {
            throw new Error("❌ Clé API TMDB manquante. Vérifiez votre fichier .env");
        }

        const response = await fetch(TMDB_DISCOVER_URL);
        if (!response.ok) {
            throw new Error(`❌ Erreur API: ${response.statusText}`);
        }

        const data = await response.json();

        // Structurer la réponse avec une clé "movies"
        res.json({ movies: data.results });
    } catch (error) {
        console.error("❌ Erreur lors de la récupération des films:", error.message);
        res.status(500).json({ error: "Erreur interne du serveur" });
    }
});

module.exports = router;

