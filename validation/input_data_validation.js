const validateInput = (req) => {
  console.log(req.role);
  // server side validation
  // destructuring the data
  let {
    name,
    email,
    phone,
    address,
    city,
    state,
    pincode,
    joining_date,
    password,
  } = req.body;

  // extra validation for doctor data
  if (req.role === "doctor") {
    if (!req.body.specialisation || !req.body.experience) {
      return false;
    }
  }
  //   server side validation
  if (
    !name ||
    !email ||
    !phone ||
    !address ||
    !city ||
    !state ||
    !pincode ||
    !joining_date ||
    !password
  ) {
    return false;
  } else {
    return true;
  }
};

module.exports = validateInput;
