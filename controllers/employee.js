const bcrypt = require("bcrypt");
const session = require("express-session");
const employee = require("../models/employeeModel");
const { photoUpload } = require("../middlewares/imageUpload");
const fs = require("fs");
const path = require("path");

const viewHome = async (req, res) => {
  res.render("index");
};
const viewEmp = async (req, res) => {
  res.render("views");
};

//Getting employee
const getAllemployee = async (req, res) => {
  let perPage = req.query.limit || 10;
  let page = req.query.page || 1;

  try {

    const pipeLine = [
     
      {
        $facet : {
          totalUsers : [
            {
              $count: 'count'
            }
          ] ,

          data: [ 
            { $sort: { updatedAt: -1 }}, 
            { $skip: (perPage * page - perPage) },
            { $limit: Number(perPage) } 
          ]
        }
      }
    ]
 
    const result = await employee.aggregate(pipeLine);
   
    res.status(200).json({
      status: "Success",
      data: result[0].data,
      count: result[0].totalUsers,
    });
  } catch (err) {
    res.status(400).json({
      status: "Failed",
      message: "Server error",
    });
    console.log(err);
  }
};
//Getting employee by id
const getAnEmp = async (req, res) => {
  const id = req.params.id;

  try {
    const employe = await employee.findById(id);

    res.status(200).json({
      status: "Success",
      data: employe,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "Failed",
      message: "Employee not found",
    });
  }
};
// Adding new user
const addUser = async (req, res) => {
  try {
    var newEmployee = new employee({
      salutation: req.body.salutation,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      username: req.body.username,
      password: req.body.password,
      dob: req.body.dob,
      gender: req.body.gender,
      address: req.body.address,
      email: req.body.email,
      phone: req.body.phone,
      quolifications: req.body.quolifications,
      country: req.body.country,
      state: req.body.state,
      city: req.body.city,
      pin: req.body.pin,
    });

    //Saving new employee to database
    await newEmployee.save();

    res.status(201).json({
      status: "success",
      data: newEmployee.id,
      message: "Employee creation successful",
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "failed",
      message: "Employee creation failed",
    });
  }
};

//Logging out the user
const logOut = (req, res) => {
  res.clearCookie("token");
  req.session.message = {
    type: "success",
    info: "You are successfully loged out",
  };
  return res.redirect("/user/login");
};

// Posting photo

const postAvatar = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const emp = await employee.findById(id);

  const { avatar } = emp;

  //photo path
  console.log(emp);
  console.log(avatar);
  try {
    if (avatar !== "default_avatar.jpg") {
      //Deleting old file if exist
      const avatarPath = path.join(
        __dirname,
        "..\\assets\\",
        "uploads",
        `${avatar}`
      );
      console.log(avatarPath);
      if (fs.existsSync(avatarPath)) {
        fs.unlinkSync(avatarPath);
        await employee.updateOne(
          { _id: id },
          { avatar: `${req.file.filename}` }
        );
      }
    } else {
      await employee.updateOne({ _id: id }, { avatar: `${req.file.filename}` });
    }
  } catch (err) {
    console.log(err);
  }
};

// Edit

const editEmp = async (req, res) => {
  const id = req.params.id;

  try {
    await employee.findByIdAndUpdate(id, {
      salutation: req.body.salutation,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      username: req.body.username,
      password: req.body.password,
      dob: req.body.dob,
      gender: req.body.gender,
      address: req.body.address,
      email: req.body.email,
      phone: req.body.phone,
      quolifications: req.body.quolifications,
      country: req.body.country,
      state: req.body.state,
      city: req.body.city,
      pin: req.body.pin,
      updatedAt: Date.now(),
    });

    res.status(201).json({
      status: "Success",
      message: "employee updated successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(401).json({
      status: "Failed",
      message: "employee not updated",
    });
  }
};

const deleteEmp = async (req, res) => {
  const id = req.params.id;

  try {
    const emp = await employee.findById(id);

    //Deleting employee photo while deleting
    const { avatar } = emp;
    const avatarPath = path.join(
      __dirname,
      "..\\assets\\",
      "uploads",
      `${avatar}`
    );

    if (avatar !== "default_avatar.jpg") {
      if (fs.existsSync(avatarPath)) {
        fs.unlinkSync(avatarPath);
      }
    }

    await employee.deleteOne({ _id: id });

    res.status(204).json({
      status: "Success",
      message: "Employee deleted successfully",
    });
  } catch (err) {
    res.status(401).json({
      status: "Failed",
      message: "Employee not found",
    });

    console.log(err);
  }
};

//Search
const searchEmp = async (req, res) => {
  let { payload } = req.body;
  let perPage = req.query.limit || 10;

  let search = await employee
    .find({
      $or: [
        { firstname: { $regex: new RegExp("^" + payload + ".*", "i") } },
        { lastname: { $regex: new RegExp("^" + payload + ".*", "i") } },
        { phone: { $regex: new RegExp("^" + payload + ".*", "i") } },
        { email: { $regex: new RegExp("^" + payload + ".*", "i") } },
      ],
    })
    .limit(Number(perPage));

  res.status(200).json({
    data: search,
  });
};

module.exports = {
  viewHome,
  addUser,
  logOut,
  getAllemployee,
  postAvatar,
  getAnEmp,
  editEmp,
  deleteEmp,
  viewEmp,
  searchEmp,
};
