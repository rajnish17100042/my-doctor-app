const getTableName = (role) => {
  //   console.log(role);
  let tableName = "";
  // now based on the role choose the table for student,teacher or admin
  if (role === "patient") {
    tableName = "patient_registration";
  } else if (role === "doctor") {
    tableName = "doctor_registration";
  } else if (role === "admin") {
    tableName = "admin_registration";
  }

  return tableName;
};

module.exports = getTableName;
