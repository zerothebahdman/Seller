const cloudinary = require('cloudinary').v2;
const { Product, Category, SubCategory, Admin } = require('../../models');
const AppError = require('../utils/AppErrorClass');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET_KEY,
});

exports.getAllAd = async (req, res, next) => {
  try {
    const ad = await Product.findAll({
      include: [
        { model: Admin, as: 'admin', attributes: ['uuid', 'name', 'email'] },
        { model: Category, as: 'category', attributes: ['uuid', 'name'] },
        { model: SubCategory, as: 'subcategory', attributes: ['uuid', 'name'] },
      ],
    });
    res.status(200).json({ status: `success`, number_of_ad: ad.length, ad });
  } catch (err) {
    return next(new AppError(err.message, err.status || 500));
  }
};

let adImage;
const images = async (image) => {
  const publicId = image.split(`/`).pop().replace('.', ' ').split(' ')[0];
  adImage = await cloudinary.uploader.upload(
    image,
    {
      public_id: publicId,
      folder: 'testing',
      overwrite: false,
      responsive: true,
      transformation: { quality: '100', crop: 'scale' },
    },
    (err) => {
      if (err) console.log(err);
    }
  );
  return adImage;
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

    const firstImage = images(adFirstImage);
    const secondImage =
      adSecondImage !== undefined ? images(adSecondImage) : undefined;
    const thirdImage =
      adSecondImage !== undefined ? images(adThirdImage) : undefined;
    const fourthImage =
      adSecondImage !== undefined ? images(adFourthImage) : undefined;

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
      ad_first_image: (await firstImage).url,
      ad_second_image:
        adSecondImage !== undefined ? (await secondImage).url : undefined,
      ad_third_image:
        adThirdImage !== undefined ? (await thirdImage).url : undefined,
      ad_fourth_image:
        adFourthImage !== undefined ? (await fourthImage).url : undefined,
    });

    res.status(200).json({ status: 'success', product });
  } catch (err) {
    return next(new AppError(err.message, err.status || 500));
  }
};
