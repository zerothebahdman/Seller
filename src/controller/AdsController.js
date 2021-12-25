const { Product, Category, SubCategory } = require("../../models");
const AppError = require("../utils/AppErrorClass");

exports.getAllAd = async (req, res, next) => {
  try {
    const ad = await Product.findAll();
    res.status(200).json({ status: `success`, number_of_ad: ad.length, ad });
  } catch (err) {
    return next(new AppError(err.message, err.status || 500));
  }
};

exports.createAd = async (req, res, next) => {
  try {
    const {
      name,
      category,
      subCategory,
      quantity,
      sellingPrice,
      discountPrice,
      productCondition,
      color,
      size,
      description,
      specification,
      adFirstImage,
      adSecondImage,
      adThirdImage,
      adFourthImage,
    } = req.body;

    const getCategoryId = await Category.findOne({ where: { id: category } });
    const getSubCategoryId = await SubCategory.findOne({
      where: { id: subCategory },
    });

    const { id, uuid } = req.admin;
    const product = await Product.create({
      name,
      slug: name,
      adminId: id,
      adminUuid: uuid,
      categoryId: getCategoryId.id,
      subcategoryId: getSubCategoryId.id,
      quantity,
      color,
      size,
      selling_price: sellingPrice,
      discount_price: discountPrice,
      product_condition: productCondition,
      description,
      specification,
      ad_first_image: adFirstImage,
      ad_second_image: adSecondImage,
      ad_third_image: adThirdImage,
      ad_fourth_image: adFourthImage,
    });
    res.status(200).json({ status: "success", product });
  } catch (err) {
    return next(new AppError(err.message, err.status || 500));
  }
};
