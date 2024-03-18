const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    include: [{ model: Product }],
  })
    .then((getTagData) => {
      res.status(200).json(getTagData);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findByPk(req.params.id, {
    include: [{ model: Product }],
  })
    .then((getTagId) => {
      if (!getTagId) {
        res.status(404).json({ message: 'No tag with this id!' });
        return;
      }
      res.status(200).json(getTagId);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create(req.body)
    .then((createNewTag) => {
      res.status(200).json(createNewTag);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then(([updateCount]) => {
      if (updateCount === 0) {
        res.status(404).json({ message: 'No tag with this id!' });
        return;
      }
      res.status(200).json({ message: 'Tag updated successfully!' });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
  // delete one tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((deleteCount) => {
      if (deleteCount === 0) {
        res.status(404).json({ message: 'No tag with this id!' });
        return;
      }
      res.status(200).json({ message: 'Tag deleted successfully!' });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = router;
