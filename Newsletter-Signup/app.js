const express = require("express");
const bodyParser = require("body-parser");
const mailchimp = require("@mailchimp/mailchimp_marketing");
const listId = "*********";

const app = express();

//Setting up MailChimp
mailchimp.setConfig({
  apiKey: "*************",
  server: "**",
});

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(express.static("public"));

app.listen(3000, (res) => {
  console.log("\n*******Server is running and listening on port 3000.******");
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", async (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const emailAddress = req.body.emailAddress;

  const data = {
    members: [
      {
        email_address: emailAddress,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      },
    ],
  };

  try {
    const response = await mailchimp.lists.batchListMembers(listId, data);

    if (response.new_members[0].status === "subscribed") {
      res.sendFile(__dirname + "/success.html");
    }
  } catch {
    res.sendFile(__dirname + "/failure.html");
  }
});

app.post("/failure", (req, res) => {
  res.redirect("/");
});
