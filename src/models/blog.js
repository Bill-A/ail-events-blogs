module.exports = (sequelize, type) => {
  return sequelize.define("blog", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    publicationDate: type.DATEONLY,
    title: type.STRING,
    subTitle: type.STRING,
    shortDescription: type.TEXT,
    url: type.STRING
  });
};
