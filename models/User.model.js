const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required.'],
      match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.'],
      unique: true, // leave for now
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: [true, 'Password is required.']
    }
  },
  {
    timestamps: true
  }
);

module.exports = model('User', userSchema);

// THIS WILL BE USED WHEN WE VALIDATE ADDRESS
// STORE USER LOCATION COORDINATES

// users: {
//   location: {
//      type: "Point",
//      coordinates: [-73.856077, 40.848447]
//   },
//   name: "Morris Park Bake Shop"
// }

// {              
//   geometry: {
//      type: "Polygon",
//      coordinates: [[
//         [ -73.99, 40.75 ],
//         [ -73.99, 40.75],
//         ...
//         [ -73.98, 40.76 ],
//         [ -73.99, 40.75 ]
//      ]]
//    },
//    name: "Hell's Kitchen"
// }
// this one may be perfect
// {
//   type: "MultiPoint",
//   coordinates: [
//      [ -73.9580, 40.8003 ],
//      [ -73.9498, 40.7968 ],
//      [ -73.9737, 40.7648 ],
//      [ -73.9814, 40.7681 ]
//   ]
// }