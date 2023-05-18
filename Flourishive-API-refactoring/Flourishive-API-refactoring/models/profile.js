module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Profile", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    fathersName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mothersName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [["Male", "Female"]],
      },
    },
    dob: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        isDate: true,
      },
    },
    mobileNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isNumeric: true,

        is: /^[0-9]{10}$/i, // regular expression to validate 10-digit mobile number
      },
    },
    collegeName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sscPercentage: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      validate: {
        min: 0,
        max: 100,
      },
    },
    hscPercentage: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      validate: {
        min: 0,
        max: 100,
      },
    },
    graduationPercentage: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      validate: {
        min: 0,
        max: 100,
      },
    },
    graduationBranch: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    noOfBacklogs: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    academicGaps: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    passoutBatch: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isNumeric: true,
       
      },
    },
    linkdinUrl: {
      type: DataTypes.TEXT,
    },
    githubUrl: {
      type: DataTypes.TEXT,
    },
    resumeUrl: {
      type: DataTypes.TEXT,
    },
    domainInterested: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  });
};
