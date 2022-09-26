const ejs = require("ejs");
const path = require("path");
const transporter = require("./transpoter");

const BroadCastMail = async ({ name, email }) => {
  const requiredPath = path.join(__dirname, "../view/loginAlert.ejs");

  const data = await ejs.renderFile(requiredPath, {
    name: name,
  });

  var mainOptions = {
    from: '"Ritik Soni" ritiksingat7@gmail.com',
    to: email,
    subject: "Daily ",
    html: data,
  };

  await transporter.sendMail(mainOptions);
};

module.exports = BroadCastMail;