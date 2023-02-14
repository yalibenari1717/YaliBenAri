module.exports = (sequelize, Sequelize) => {
  const Trip = sequelize.define(
    "Trip",
    {
      destination: {
        type: Sequelize.STRING,
      },
      hotel: {
        type: Sequelize.STRING,
      },
      username: {
        type: Sequelize.STRING,
      },
      phoneNumber: {
        type: Sequelize.STRING,
      },
      nightLife: {
        type: Sequelize.INTEGER,
      },
      landscape: {
        type: Sequelize.INTEGER,
      },
      shopping: {
        type: Sequelize.INTEGER,
      },
      finalGrade: {
        type: Sequelize.INTEGER,
      },
      english: {
        type: Sequelize.INTEGER,
      },
      hebrew: {
        type: Sequelize.INTEGER,
      },
      else: {
        type: Sequelize.INTEGER,
      },
      dates: {
        type: Sequelize.STRING,
      },
      recommendations: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
      },
      top3: {
        type: Sequelize.STRING,
      },
      lat: {
        type: Sequelize.FLOAT,
      },
      lng: {
        type: Sequelize.FLOAT,
      },
    },
    {
      timestamps: false,
    }
  );
  return Trip;
};
