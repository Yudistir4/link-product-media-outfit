const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const AccountSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
    },
    profilePicUrl: { type: String },
    filename: { type: String },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true }, // So `res.json()` and other `JSON.stringify()` functions include virtuals
    toObject: { virtuals: true },
  }
);
AccountSchema.plugin(mongoosePaginate);

// AccountSchema.virtual("comments", {
//   ref: "Comment",
//   localField: "_id",
//   foreignField: "postId",
// });

module.exports = mongoose.model("Account", AccountSchema);
