// const mongoose = require("mongoose");
// mongoose
//   .connect("mongodb://127.0.0.1:27017/snaptalk", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     bufferCommands: false,
//   })
//   .then(() => console.log("Database connected!"))
//   .catch((err) => console.log(err));

const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/snaptal', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  bufferCommands: false, // Disable buffering
})
.then(() => {
  console.log('Database connected!');
  // Start your application logic here
})
.catch(err => {
  console.error('Database connection error:', err);
  process.exit(1); // Exit the process if the connection fails
});