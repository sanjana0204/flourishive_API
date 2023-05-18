const {
  Candidate,
  Profile,
  Permission,
  Role,
  Resume,
  Exam,
} = require("../../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const _ = require("underscore");
const saltRounds = 10;

const registerCandidate = (req, res) => {
  const data = req.body;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+.]).{8,50}$/;
  if (!passwordRegex.test(data.password)) {
    return res.status(400).json({
      status: "error",
      message: "Password must be between 8 and 50 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    });
  }
  bcrypt.hash(data.password, saltRounds, function (err, hash) {
    data.password = hash;
    Candidate.create({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      status: data.status,
    })
      .then((create_candidate) => {
        const { password, ...result } = create_candidate.dataValues;
        res.status(201).json({
          status: "success",
          message: "candidate created successfully",
          data: result,
        });
      })
      .catch((error) => {
        return res.status(500).json({
          status: "error",
          message: "Internal server error",
          error: error,
        });
      });
  });
};

const getCandidateById = (req, res) => {
  Candidate.findByPk(req.params.id, {
    include: [
      { model: Profile },
      { model: Resume },
      { model: Exam },
      {
        model: Role,
        as: "roles",
        include: [{ model: Permission, as: "permissions" }],
      },
    ],
  })
    .then((candidates) => {
      if (candidates) {
        const { password, ...result } = candidates.dataValues;
        res.status(200).json({
          status: "success",
          message: "candidates fetched successfully",
          data: result,
        });
      } else {
        return res.status(404).json({
          status: "failed",
          message: "candidate not found",
        });
      }
    })
    .catch((error) => {
      return res.status(500).json({
        status: "failed",
        message: "Database error",
        error: error,
      });
    });
};

const getCandidateByEmail = (req, res) => {
  console.log(req.body.email);
  Candidate.findOne({
    where: { email: req.body.email },
    include: [
      { model: Profile },
      { model: Resume },
      { model: Exam },
      {
        model: Role,
        as: "roles",
        include: [{ model: Permission, as: "permissions" }],
      },
    ],
  })
    .then((candidate) => {
      if (candidate) {
        const { password, ...result } = candidate.dataValues;
        res.status(200).json({
          status: "success",
          message: "candidates fetched successfully",
          data: result,
        });
      } else {
        return res.status(404).json({
          status: "failed",
          message: "candidate not found",
        });
      }
    })
    .catch((error) => {
      return res.status(500).json({
        status: "failed",
        message: "Database error",
        error: error,
      });
    });
};

const updateCandidateById = (req, res) => {
  Candidate.update(req.body, { where: { id: req.params.id } })
    .then((candidate) => {
      if (candidate) {
        res.status(200).json({
          status: "success",
          message: "candidate updated successfully",
        });
      } else {
        return res.status(404).json({
          status: "failed",
          message: "candidate not found",
        });
      }
    })
    .catch((error) => {
      return res.status(500).json({
        status: "error",
        message: "Internal Server error",
        error: error,
      });
    });
};

const getAllCandidate = (req, res) => {
  // jwt.verify(req.token, process.env.JWT_SECRET_KEY, (err, authdata) => {
  //   if (err) {
  //     res.send({
  //       result: "Invalid token",
  //     });
  //   } else {
  Candidate.findAll({
    attributes: { exclude: ["password"] },
    include: [
      { model: Profile },
      { model: Resume },
      { model: Exam },
      { model: Role, as: "roles" },
    ],
  })
    .then((candidates) => {
      if (candidates.length > 0) {
        res.status(200).json({
          status: "success",
          message: "candidates fetched successfully",
          data: candidates,
        });
      } else {
        return res.status(404).json({
          status: "failed",
          message: "candidates not found",
        });
      }
    })
    .catch((error) => {
      return res.status(500).json({
        status: "error",
        message: "Database error",
        error: error,
      });
    });
  //   }
  // });
};

const deleteCandidate = (req, res) => {
  Candidate.destroy({ where: { id: req.body.id } })
    .then((candidate) => {
      if (candidate === 1) {
        res.status(200).json({
          status: "success",
          message: "candidates Deleted successfully",
        });
      } else {
        return res.status(404).json({
          status: "failed",
          message: "candidates not found",
        });
      }
    })
    .catch((error) => {
      return res.status(500).json({
        status: "error",
        message: "Database error",
        error: error,
      });
    });
};

const getAllPermissionsToCandidate = (req, res) => {
  Candidate.findByPk(req.body.id, {
    attributes: { exclude: ["password"] },
    include: [
      { model: Profile },
      { model: Resume },
      {
        model: Role,
        as: "roles",
        include: [
          { model: Permission, as: "permissions", attributes: ["id", "name"] },
        ],
        attributes: ["id"],
      },
    ],
  })
    .then((candidate) => {
      if (candidate) {
        const data = _.uniq(
          _.flatten(
            candidate.roles.map((role) => {
              return role.permissions.map((permission) => {
                return permission.id;
              });
            })
          )
        );
        res.status(200).json(data);
      } else {
        return res.status(404).json({
          status: "failed",
          message: "candidate not found",
        });
      }
    })
    .catch((error) => {
      return res.status(500).json({
        status: "failed",
        message: "Database error",
        error: error,
      });
    });
};

const login = (req, res) => {
  const { email, password } = req.body;
  console.log(`${email} is trying to login ..`);

  Candidate.findOne({
    where: {
      email: email,
    },
  })
    .then((candidate) => {
      if (!candidate) {
        return res.status(404).json({
          status: "failed",
          message: "candidate not found or status is inactive",
        });
      } else {
        if (candidate.status === true) {
          bcrypt.compare(password, candidate.password, (err, result) => {
            if (!result) {
              return res.status(401).json({
                status: "failed",
                message: "password is incorrect",
                error: err,
              });
            } else {
              const token = jwt.sign(
                {
                  id: candidate.id,
                  email: candidate.email,
                  time: Date(),
                },
                process.env.JWT_SECRET_KEY,
                {
                  expiresIn: "5363s",
                }
              );

              res.status(200).json({
                status: "success",
                message: "Login Sucessful",
                token: token,
              });
            }
          });
        } else {
          return res.status(400).json({
            status: "error",
            message: "Status Inactive",
            error: error,
          });
        }
      }
    })
    .catch((error) => {
      return res.status(400).json({
        status: "error",
        message: "Status Inactive",
        error: error,
      });
    });
};

const verCad = (req, res) => {
  res.status(200).json({
    data: req.user,
  });
};


const forgotPassword = (req, res) => {
  const { email } = req.body;
  Candidate.findOne({
    where: {
      email: email,
    },
  })
    .then((candidate) => {
      if (!candidate) {
        return res.status(404).json({
          status: "failed",
          message: "candidate not found",
        });
      } else {
        const secret = process.env.JWT_SECRET_KEY + candidate.updatedAt;
        const payload = {
          id: candidate.id,
          email: candidate.email,
        };
        const token = jwt.sign(payload, secret, { expiresIn: "5363s" });
        const link = `http://localhost:3342/reset-password/${candidate.id}/${token}`;
        console.log(link);
        res.status(200).json({
          message: "Password reset link has been sent to your email...",
        });
      }
    })
    .catch((error) => {
      return res.status(404).json({
        status: "failed",
        message: "candidate not found",
        error: error,
      });
    });
};

var resetPasswordGet = (req, res) => {
  const { id, token } = req.params;
  Candidate.findOne({
    where: {
      id: id,
    },
  })
    .then((candidate) => {
      if (!candidate) {
        return res.status(404).json({
          status: "failed",
          message: "candidate not found",
        });
      } else {
        const secret = process.env.JWT_SECRET_KEY + candidate.updatedAt;
        const decoded = jwt.verify(token, secret);
        Candidate.findOne({
          where: {
            id: decoded.id,
          },
        })
          .then((validCand) => {
            if (!validCand) {
              return res.status(400).json({
                status: "failed",
                message: "Token Not Verified",
              });
            } else {
              res.status(200).json({ data: validCand });
            }
          })
          .catch((error) => {
            return res.status(400).json({
              status: "failed",
              message: "Token Not Verified",
              error: error,
            });
          });
      }
    })
    .catch((error) => {
      return res.status(404).json({
        status: "failed",
        message: "candidate not found",
        error: error,
      });
    });
};

var resetPasswordPost = (req, res) => {
  let data = req.body;
  const { id, token } = req.params;
  Candidate.findOne({
    where: {
      id: id,
    },
  })
    .then((candidate) => {
      if (!candidate) {
        return res.status(404).json({
          status: "failed",
          message: "candidate not found",
          error: error,
        });
      } else {
        const secret = process.env.JWT_SECRET_KEY + candidate.updatedAt;
        const decoded = jwt.verify(token, secret);
        Candidate.findOne({
          where: {
            id: decoded.id,
          },
        })
          .then((validCand) => {
            if (!validCand) {
              return res.status(400).json({
                status: "failed",
                message: "Token Not Verified",
              });
            } else {
              bcrypt.hash(data.password, saltRounds, function (err, hash) {
                data.password = hash;
                Candidate.update(
                  { password: data.password },
                  { where: { id: validCand.id } }
                )
                  .then((candidate) => {
                    if (candidate) {
                      res.status(200).json({
                        status: "success",
                        message: "Password updated successfully",
                      });
                    } else {
                      return res.status(400).json({
                        status: "failed",
                        message: "Password Not Updated",
                      });
                    }
                  })
                  .catch((error) => {
                    return res.status(500).json({
                      status: "error",
                      message: "Internal Server error",
                      error: error,
                    });
                  });
              });
            }
          })
          .catch((error) => {
            return res.status(400).json({
              status: "failed",
              message: "Token Not Verified",
              error: error,
            });
          });
      }
    })
    .catch((error) => {
      return res.status(404).json({
        status: "failed",
        message: "Token Not Verified",
        error: error,
      });
    });
};

module.exports = {
  registerCandidate,
  getAllCandidate,
  getCandidateById,
  updateCandidateById,
  getCandidateByEmail,
  deleteCandidate,
  getAllPermissionsToCandidate,
  login,
  verCad,
  forgotPassword,
  resetPasswordGet,
  resetPasswordPost,
};
