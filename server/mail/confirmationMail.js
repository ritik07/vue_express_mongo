const ejs = require("ejs");
const path = require("path");
const transporter = require("./transpoter");

const confirmationMail = async ({ name, email }) => {
  const requiredPath = path.join(__dirname, "../view/confirmation.ejs");

  const data = await ejs.renderFile(requiredPath, {
    name: name,
  });

  var mainOptions = {
    from: '"Ritik Soni" ritiksingat7@gmail.com',
    to: email,
    subject: "Account Activated",
    html: data,
  };

  await transporter.sendMail(mainOptions);
};

module.exports = confirmationMail;