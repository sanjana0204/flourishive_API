const { Candidate, Role, Permission, Profile, Otp } = require("../../models");
const moment = require("moment"); // require
const bcrypt = require("bcrypt");
const _ = require("lodash");
const otpGenerator = require("otp-generator");
const saltRounds = 10;
const { Op } = require("sequelize");

const createProfile = (req, res) => {
  data = req.body;

  Candidate.findByPk(data.candidateId)
    .then((candidate) => {
      console.log(candidate);
      if (candidate) {
        data.profile.dob = moment(data.profile.dob, "YYYY-MM-DD");
        const temp_profile = { CandidateId: data.candidateId, ...data.profile };

        console.log(temp_profile);
        Profile.create(temp_profile)
          .then((profile) => {
            res.status(200).json({
              status: "success",
              message: "Profile created successfully",
              profile: profile,
            });
          })
          .catch((error) => {
            res.status(500).json({
              status: "error",
              message: "Error creating profile",
              error: error,
            });
          });
      } else {
        res.status(404).json({
          status: "error",
          message: "Candidate not found",
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        status: "error",
        message: "Error retrieving candidate",
        error: error,
      });
    });
};

const updateProfile = (req, res) => {
  data = req.body;

  if (data.profile.dob) {
    data.profile.dob = moment(data.profile.dob, "YYYY-MM-DD");
  }
  Profile.update(data.profile, {
    where: { CandidateId: data.candidateId },
  })
    .then((result) => {
      res.status(200).json({
        status: "success",
        message: "Profile updated successfully",
        data: result,
      });
    })
    .catch((error) => {
      res.status(500).json({
        status: "error",
        message: "Error updating profile",
        error: error,
      });
    });
};

const verifyMobileNum = (req, res) => {
  Profile.findOne({
    where: {
      mobileNumber: req.body.mobileNumber,
    },
  })
    .then((candidate) => {
      if (!candidate) {
        return res.status(400).json({
          status: "error",
          message: "Mobile Number Not Registered !",
          error: error,
        });
      } else {
        Otp.findOne({
          where: {
            mobileNumber: req.body.mobileNumber,
          },
        })
          .then((candidate) => {
            if (candidate) {
              return res.status(200).json({
                message: "Otp Has already been sent  !",
              });
            } else {
              let OTP = otpGenerator.generate(6, {
                digits: true,
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                upperCase: false,
                specialChars: false,
              });

              console.log(OTP);

              bcrypt.hash(OTP, saltRounds, function (err, hash) {
                OTP = hash;
                Otp.create({
                  mobileNumber: req.body.mobileNumber,
                  otp: OTP,
                });
              });

              return res
                .status(200)
                .json({ message: "Otp sent successfully!" });
            }
          })
          .catch((error) => {
            return res.status(500).json({
              status: "error",
              message: "Internal server error",
              error: error,
            });
          });
      }
    })
    .catch((error) => {
      return res.status(500).json({
        status: "error",
        message: "Internal server error",
        error: error,
      });
    });
};

const verifyOtp = (req, res) => {
  const { mobileNumber, otp } = req.body;

  Otp.destroy({
    where: {
      createdAt: { [Op.lt]: new Date(Date.now() - 15000) },
      mobileNumber: mobileNumber,
    },
  });

  Otp.findOne({
    where: {
      mobileNumber: mobileNumber,
    },
  })
    .then((candidate) => {
      if (!candidate) {
        return res.status(404).json({
          status: "failed",
          message: "Otp Has Been Expired !",
        });
      } else {
        bcrypt.compare(otp, candidate.otp, (err, result) => {
          if (!result) {
            return res.status(401).json({
              status: "failed",
              message: "otp is incorrect",
              error: err,
            });
          } else {
            return res.status(200).json({
              status: "success",
              message: "Mobile Number Verified !",
            });
          }
        });
      }
    })
    .catch((error) => {
      return res.status(400).json({
        status: "error",
        message: "Otp Has Been Expired !",
        error: error,
      });
    });
};

module.exports = { createProfile, updateProfile, verifyMobileNum, verifyOtp };
