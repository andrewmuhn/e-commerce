const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findAll({
      include: { model: Product, through: ProductTag, as: 'products' }
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: { model: Product, through: ProductTag, as: 'products' }
    });
    if (!tagData) {
      res.status(404).json({ message: 'No tag found with that id' });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.json(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  /* req.body should look like this...
{
  tag_name: "shiny",
  productIds: [1, 2, 3, 4]
}
  */
  if (!req.body.tag_name) {
    res.status(400).json({ message: 'Missing "tag_name" in request body' });
    return;
  }
  try {
    const tag = await Tag.create(req.body);
    if (req.body.productIds.length) {
      const tagProductIdArr = req.body.productIds.map((product_id) => {
        return {
          tag_id: tag.id,
          product_id
        };
      });
      const TagIds = await ProductTag.bulkCreate(tagProductIdArr);
      if (!TagIds) {
        res.status(400).json({ message: 'Bulk Create Failed' });
      }
      res.status(200).json(TagIds);
    } else {
      res.status(200).json(tag);
    }
  } catch (err) {
    res.json(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  if (!req.body.tag_name) {
    res.status(400).json({ message: 'Missing tag_name in request body' });
    return;
  }
  try {
    const existingTag = await Tag.findByPk(req.params.id);
    if (!existingTag) {
      res.status(404).json({ message: 'Tag with that id not found' });
      return;
    }
    await existingTag.update(req.body);

    // This is here to handle updating the associated Product Tags
    const productTags = await ProductTag.findAll({
      where: { tag_id: req.params.id }
    });

    const ProductTagIds = productTags.map(({ product_id }) => product_id);
    console.log(ProductTagIds);
    const newProductTags = req.body.productIds
      .filter((product_id) => !ProductTagIds.includes(product_id))
      .map((product_id) => ({
        tag_id: req.params.id,
        product_id
      }));

    const productTagsToRemove = productTags
      .filter(({ product_id }) => !req.body.productIds.includes(product_id))
      .map(({ id }) => id);

    const updatedProductTags = await Promise.all([
      ProductTag.destroy({ where: { id: productTagsToRemove } }),
      ProductTag.bulkCreate(newProductTags)
    ]);
    res.status(200).json(updatedProductTags);
  } catch (err) {
    res.json(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const existingTag = await Tag.findByPk(req.params.id);
    if (!existingTag) {
      res.status(404).json({ message: 'Tag with that id not found' });
      return;
    }

    await existingTag.destroy();
    res.status(200).json({ message: 'Tag succesfully deleted' });
  } catch (err) {
    res.json(500).json(err);
  }
});

module.exports = router;
