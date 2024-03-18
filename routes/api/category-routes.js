const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    include: [{ model: Product }],
  })
    .then((getCatData) => {
      res.status(200).json(getCatData);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findByPk(req.params.id, {
    include: [{ model: Product }],
  })
    .then((getCatId) => {
      if (!getCatId) {
        res.status(404).json({ message: 'No category with this id!' });
        return;
      }
      res.status(200).json(getCatId);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name,
  })
    .then((createNewCat) => {
      res.status(200).json(createNewCat);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((updateCatId) => {
      res.status(200).json(updateCatId);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((deleteCatId) => {
      if (!deleteCatId) {
        res.status(404).json({ message: 'No category with this id!' });
        return;
      }
      res.status(200).json(deleteCatId);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = router;
