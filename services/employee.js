const employee = require("../models/employeeModel");

const findMethod = async() => {

    try {
       const result = await employee.find();
    }catch(err){
        console.log(err)
    }
   
    console.log(result)
    return result ;
}

console.log(findMethod())