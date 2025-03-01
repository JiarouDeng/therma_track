const regex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_]).+$/;

const handleLogin = async (
  username: string,
  password: string
): Promise<[boolean, string]> => {
  const res = await fetch(`http://localhost:4000/userinfo/${username}`);
  const data = await res.json();
  const pi = data["data"];
  if (pi.length === 0)
    return [
      false,
      "the username has never been registered. Do you want to sign up?",
    ];
  // Check if the username exists and the password matches
  else if (pi[0] === password) return [true, pi[1]]; // data[1] is set to be patient / doctor identifier

  return [false, "invalid username or password"];
};

const parseUserNameAndPassword = async (
  username: string,
  password: string
): Promise<[boolean, string]> => {
  const res = await fetch(`http://localhost:4000/userinfo/${username}`);
  const data = await res.json();
  if (data["data"].length == 2) return [false, "username already registered"];
  // Check if the username exists and the password matches

  if (password.length < 10)
    return [false, "password needs to be longer than 10 characters."];
  else if (regex.test(password) === false)
    return [
      false,
      "password must be a combination of letters, digits, and at least one special character.",
    ];
  const sign_up_data = {
    username: username,
    password: password,
    identifier: "p",
  };
  const register = await fetch("http://localhost:4000/userinfo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(sign_up_data), // Convert the data to JSON
  });
  if (register.ok) {
    const responseData = await register.json(); // Parse the JSON response
    console.log(responseData);
  }
  return [true, "d"];
};

const parseDateofBirth = async (
  patient_id: string,
  dob: string
): Promise<[boolean, string]> => {
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
  const res = await fetch(`http://localhost:4000/patients/${patient_id}`);
  const data = await res.json();
  console.log(data);
  const pi = data["data"];

  if (Object.keys(pi).length === 0)
    return [false, "unable to find patient information"];
  if (pi["dob"] !== dob) return [false, "incorrect patient information"];
  return [true, `successfully registered patient ${pi["name"]}`];
};

export default { handleLogin, parseUserNameAndPassword, parseDateofBirth };
