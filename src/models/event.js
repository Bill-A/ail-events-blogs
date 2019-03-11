module.exports = (sequelize, type) => {
  return sequelize.define("event", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: type.STRING,
    startDate: type.DATE,
    endDate: type.DATE,
    location: type.STRING,
    description: type.TEXT
  });
};
