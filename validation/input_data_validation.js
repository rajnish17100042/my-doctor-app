const validateInput = (req) => {
  // console.log(req.role);
  // console.log(req.body);
  // server side validation
  // destructuring the data
  let { name, email, phone, address, city, state, pincode, password } =
    req.body;

  // extra validation for doctor data
  if (req.role === "doctor") {
    if (
      !req.body.specialisation ||
      !req.body.experience ||
      !req.body.joining_date
    ) {
      return false;
    }
  }

  // extra validation for patient data
  if (req.role === "patient") {
    if (!req.body.symptoms || !req.body.doctor || !req.body.appointment_date) {
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
    !password
  ) {
    return false;
  } else {
    return true;
  }
};

module.exports = validateInput;
