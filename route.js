const express = require('express');
const router = express.Router();
const Category = require('./Model/Category')
const Details = require('./Model/Details')
const jwt = require('jsonwebtoken');
const tokenVerify = require('./tokenVerify');

router.post('/categories', async (req, res) => {
  try {
    const { certificateType, description } = req.body;
    const category = new Category({ certificateType, description });
    await category.save();
    const token = jwt.sign(
      {id: category._id},
      process.env.SECRET_KEY
    )
    res.status(201).json({
      category: category,
      token: token
    });
  } catch (err) {
    res.status(500).json({ message: 'Error creating category'});
    console.log(err)
  }
});

router.post('/questions', tokenVerify, async (req, res) => {
  try {
    const id = req.body.id
    const { questionText, categoryId } = req.body;
    const question = new Details({ questionText, categoryId: id });
    await question.save();
    res.status(201).json(question);
  } catch (err) {
    res.status(500).json({ message: 'Error creating question'});
    console.log(err)
  }
});

router.get('/all', async (req, res) => {
  try {
    const questions = await Details.find()
      .populate('categoryId', 'certificateType') 
      .exec();
    res.status(200).json(questions);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching questions'});
    console.log(err)
  }
});

module.exports = router