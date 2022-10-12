import mongoose from "mongoose"

const userSchema = mongoose.Schema({
  displayName: {
    type: String
  },
  avatar_url: {
    type: String,
    default:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIL0qVUQJz_FAJmid8OrOh7rKzwB-LWXDbDkrHQpujVkp1I0vvXGZYEPT7aYj-Ji2QZyQ&usqp=CAU",
  },
  about_details: {
    type: String,
    default:
      "I make art with the simple goal of giving you something pleasing to look at for a few seconds.",
  },
  bg_image: {
    type: String,
    default:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIL0qVUQJz_FAJmid8OrOh7rKzwB-LWXDbDkrHQpujVkp1I0vvXGZYEPT7aYj-Ji2QZyQ&usqp=CAU",
  },
  twitterUrl: {
    type: String,
    default: null,
  },
  facebookUrl: {
    type: String,
    default: null,
  },
  whatsappUrl: {
    type: String,
    default: null,
  },
  websiteUrl: {
    type: String,
    default: null,
  },
  firstname: {
    type: String,
  },
  lastname: {
    type: String,
  },
  username: {
    type: String,
    unique: true
  },
  isVerified: {
    type: Boolean,
  },
  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  wallets: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Wallet"
    }
  ]
})

export default mongoose.model("User", userSchema)
