const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const LinkSchema = new mongoose.Schema(
  {
    account: { type: mongoose.Types.ObjectId, ref: "Account", required: true },
    number: { type: Number },
    links: [
      {
        number: { type: Number },
        name: { type: String },
        link: { type: String },
      },
    ],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true }, // So `res.json()` and other `JSON.stringify()` functions include virtuals
    toObject: { virtuals: true },
  }
);
LinkSchema.plugin(mongoosePaginate);

// LinkSchema.virtual("comments", {
//   ref: "Comment",
//   localField: "_id",
//   foreignField: "postId",
// });

module.exports = mongoose.model("Link", LinkSchema);
