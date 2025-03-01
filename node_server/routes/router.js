const express = require("express");

const router = express.Router();

router.get("/temperature", (req, res) => {
  const temp_data = [
    { time: "08:00", temperature: 98.6 },
    { time: "10:00", temperature: 99.1 },
    { time: "12:00", temperature: 99.5 },
    { time: "14:00", temperature: 100.2 },
    { time: "16:00", temperature: 101.0 },
  ];
  res.json(temp_data);
});

router.get("/userinfo/:username", (req, res) => {
  const user_data = {
    bella: ["@Sleepingb2019", "p"],
    doctor: ["@Sleepingb2020", "d"],
  };

  router.post("/userinfo", (req, res) => {
    const { username, password, identifier } = req.body;
    console.log(username + " | " + password + " | " + identifier);
    res.json({
      message: `Successfully registered user ${username} as ${
        identifier === "p" ? "patient" : "doctor"
      }. Welcome!`,
      status: "success",
    });
  });

  const username = req.params.username;

  res.json({
    username,
    data: user_data[username] || [], // Returns an empty array if the user isn't found
  });
});

router.get("/patients", (req, res) => {
  const patients = [
    { id: 1, name: "a", dob: "01/02/2003" },
    { id: 2, name: "b", dob: "01/02/2003" },
    { id: 3, name: "c", dob: "01/02/2003" },
  ];
  res.json(patients);
});

router.get("/patients/:patientid", (req, res) => {
  const patients = {
    1: { name: "a", dob: "01/02/2003" },
    2: { name: "b", dob: "01/02/2003" },
    3: {
      name: "c",
      dob: "01/02/2003",
    },
  };

  const patientid = req.params.patientid;
  res.json({
    patientid,
    data: patients[patientid] || {}, // Returns an empty array if the user isn't found
  });
});

module.exports = router;
