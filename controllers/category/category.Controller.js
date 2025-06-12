const Category = require("../../Model/category.Model");

exports.create = async (req, res) => {
  const { name } = req.body;

  try {
    const category = await Category.create({
      name: name,
    });
  } catch (err) {}
};
