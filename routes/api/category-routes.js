const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findAll({
      include: { model: Product }
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.json(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: { model: Product }
    });
    if (!categoryData) {
      res.status(404).json({ message: 'No category found with that id' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.json(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  if (!req.body.category_name) {
    res.status(400).json({ message: 'Missing category_name in request body' });
    return;
  }
  try {
    const category = await Category.create(req.body);
    res.status(200).json(category);
  } catch (err) {
    res.json(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  if (!req.body.category_name) {
    res.status(400).json({ message: 'Missing category_name in request body' });
    return;
  }
  try {
    const existingCategory = await Category.findByPk(req.params.id);
    if (!existingCategory) {
      res.status(404).json({ message: 'Category with that id not found' });
      return;
    }
    await existingCategory.update(req.body);
    res.status(200).json({ message: 'Category succesfully updated' });
  } catch (err) {
    res.json(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const existingCategory = await Category.findByPk(req.params.id);
    if (!existingCategory) {
      res.status(404).json({ message: 'Category with that id not found' });
      return;
    }

    await existingCategory.destroy();
    res.status(200).json({ message: 'Category succesfully destroyed' });
  } catch (err) {
    res.json(500).json(err);
  }
});

module.exports = router;
