const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema(
{
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    name: {
        type: String,
        required: true
    },

    type: {
        type: String,
        enum: ["cash", "bank", "wallet", "credit"],
        default: "cash"
    },

    balance: {
        type: Number,
        default: 0
    }

},
{ timestamps: true }
);

module.exports = mongoose.model("Account", accountSchema);