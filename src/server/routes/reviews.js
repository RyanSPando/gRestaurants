const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
const indexController = require('../controllers/index');

router.get('/:id/reviews/new', indexController.isAuthenticated, (req, res, next) => {
  const renderObject = req.renderObject;
  renderObject.title = req.body.name;
  renderObject.restaurant_id = req.params.id;
  renderObject.name = req.session.user.name;
  renderObject.user_id = Number(req.session.user.dataId);
  res.render('new_review', renderObject);
});

router.post('/:id/reviews/new', indexController.isAuthenticated, (req, res, next) => {
  const reviewer_name = req.session.user.name;
  const rating = req.body.rating;

  var date;
  date = new Date();
  date = date.getUTCFullYear() + '-' +
    ('00' + (date.getUTCMonth() + 1)).slice(-2) + '-' +
    ('00' + date.getUTCDate()).slice(-2);

  const text = req.body.text;
  const user_id = req.body.user_id;
  const restaurant_id = req.params.id;
  const renderObject = req.renderObject;

  knex('reviews')
  .insert({
    rating: rating,
    reviewer_name: reviewer_name,
    date: date,
    text: text,
    user_id: user_id,
    restaurant_id: restaurant_id
  })
  .then(value => {
    res.redirect(`/restaurants/${restaurant_id}`);
  })
  .catch(err => {
    return next(err);
  });
});

router.delete('/:id/reviews/new', (req, res, next) => {
    const id = parseInt(req.params.id);
    return knex('reviews').del().where('restaurant_id', id)
  .then(() => {
    window.alert("Successfully Deleted");
    res.render();
  })
  .catch((err) => {
    return next(err);
  });
});

router.put('/:id/reviews/edit', indexController.isAuthenticated, (req, res, next) => {
    // grab the values to add to the db via req.body
    const id = parseInt(req.params.id); //id is restaurant_id
    const rating = req.body.rating;
    const reviewer_name = req.body.reviewer_name;
    const date = req.body.date;
    const text = req.body.text;
    const user_id = req.body.user_id;
    // add values to database
    knex('reviews').update({
      restaurant_id: id,
      rating: rating,
      reviewer_name: reviewer_name,
      date: date,
      text: text,
      user_id: user_id
    })
    .where(review_id, )
    .then((results) => {
      // redirect user
      window.alert("Successfully Edited");
      res.redirect(`/restaurants/${id}`);
    })
    .catch((err) => {
      return next(err);
    });
  });

module.exports = router;
