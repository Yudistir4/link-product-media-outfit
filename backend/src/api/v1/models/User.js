const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
      required: true,
    },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true }, // So `res.json()` and other `JSON.stringify()` functions include virtuals
    toObject: { virtuals: true },
  }
);
UserSchema.plugin(mongoosePaginate);

// UserSchema.virtual("comments", {
//   ref: "Comment",
//   localField: "_id",
//   foreignField: "postId",
// });

module.exports = mongoose.model('User', UserSchema);
