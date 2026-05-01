import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  session_state: {
    active_tab: {
      type: Number,
      default: 0,
    },
    open_tabs: [
      {
        url: {
          type: String,
          required: true,
        },
        title: {
          type: String,
          required: true,
          default: "",
        },
        favicon: {
          type: String,
          required: true,
          default: "",
        },
      },
    ],
  },
  account_type: {
    type: String,
    enum: ["free", "premium"],
    default: "free",
  },
  stripe_customer_id: {
    type: String,
    default: null,
  },
  stripe_subscription_status: {
    type: String,
    default: null,
  },
  stripe_subscription_status: {
    type: String,
    enum: ["trialing", "active", "past_due", "canceled", "unpaid", null],
    default: null,
  },
  current_period_end: {
    type: Date,
    default: null,
  },
});

export default mongoose.models.User ||
  mongoose.model("User", userSchema);
