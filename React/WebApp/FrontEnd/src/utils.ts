const regex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_]).+$/;

const parseUserNameAndPassword = (password: string): [boolean, string] => {
  if (password.length < 10)
    return [false, "password needs to be longer than 10 characters."];
  else if (regex.test(password) === false)
    return [
      false,
      "password must be a combination of letters, digits, and at least one special character.",
    ];
  return [true, ""];
};

const parseDateofBirth = (dob: string): [boolean, string] => {
  // date of birth should be of format mm/dd/yyyy
  const datePattern = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/;
  if (!datePattern.test(dob))
    return [false, "Invalid date format. Use mm/dd/yyyy"];

  // Split into components
  const [month, day, year] = dob.split("/").map(Number);

  // Check for valid month, day, year
  if (month < 1 || month > 12) return [false, "Invalid month"];
  if (day < 1 || day > 31) return [false, "Invalid day"];
  if (year < 1900 || year > new Date().getFullYear())
    return [false, "Invalid year"];

  return [true, "Valid date"];
};

export default { parseUserNameAndPassword, parseDateofBirth };
