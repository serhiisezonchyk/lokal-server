export default function applyExtraSetup(db) {
  const {
    admin,
    partner,
    place,
    post,
    postCategory,
    product,
    productCategory,
  } = db;

  /*
   *!  admin foreign keys
   */
  partner.hasMany(admin, { foreignKey: "partnerId" });
  admin.belongsTo(partner, { foreignKey: "partnerId" });



  /*
   *!   place foreign keys
   */
  partner.hasMany(place, { foreignKey: "partnerId" });
  place.belongsTo(partner, { foreignKey: "partnerId" });

  /*
   *!   post foreign keys
   */
  partner.hasMany(post, { foreignKey: "partnerId" });
  post.belongsTo(partner, { foreignKey: "partnerId" });

  postCategory.hasMany(post, { foreignKey: "postCategoryId" });
  post.belongsTo(postCategory, { foreignKey: "postCategoryId" });


  /*
   *!   product foreign keys
   */
  productCategory.hasMany(product, { foreignKey: "productCategoryId" });
  product.belongsTo(postCategory, { foreignKey: "productCategoryId" });
}
