const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

router.get('/', (req, res) => {
  
  Tag.findAll({
    include: {
      model: Product,
      attributes: ['product_name', 'price', 'stock', 'category_id']
    }
  })
    .then(dbData => res.json(dbData))
    .catch(err => {
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  
  Tag.findOne({
    where: {
      id: req.params.id
    },
    include: {
      model: Product,
      attributes: ['product_name', 'price', 'stock', 'category_id']
    }
  })
    .then(dbData => res.json(dbData))
    .catch(err => {
      res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
 
  Tag.create({
    tag_name: req.body.tag_name
  })
    .then(dbData => res.json(dbData))
    .catch(err => {
      res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
  
  Tag.update(req.body, {
    where: {
      id: req.params.id
    }
  })
    .then(dbData => {
      if (!dbData){
        res.status(404).json({message:'None Found.'});
        return;
      }
      res.json(dbData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(dbData => {
    if (!dbData) {
      res.status(404).json({message: 'None Found.'});
      return;
    }
    res.json(dbData);
  })
  .catch(err =>{
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;