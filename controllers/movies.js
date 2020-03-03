const express = require('express');
const router = express.Router();
const { sentenceCase } = require('change-case');

const { movies, discoverGenre, movie, searchMovie } = require('../public/js/tmdb');


router.get('/', async (req, res) => {
    if(!req.query.sortBy) 
        req.query.sortBy = 'now_playing';
    if(!req.cookies.popup)
        res.cookie('popup', '1');
    const show = req.cookies.popup != '1'

    res.render('movie/movies', {
        movies: await movies(req.query.sortBy),
        title: sentenceCase(req.query.sortBy),
        popup: show
    });
})

router.get('/:movieId', async (req,res) => {
    const mov = await movie(req.params.movieId);
    
    if(mov === 1) return res.status(404).render('movie/movie', {title:'404: Movie not found'});

    res.render('movie/movie', {
        movie: mov,
        title: mov.original_title
    })
})

router.post('/', async (req,res) => {
    res.render('movie/movies', {
        movies:await searchMovie(req.body.movie),
        title: req.body.movie
    })
})

router.get('/genres/:genreName', async (req, res) => {
    const genre = decodeURIComponent(req.params.genreName);
    res.render('movie/movies', {
        movies: await discoverGenre(genre),
        title: genre,
    })
})


module.exports = router;