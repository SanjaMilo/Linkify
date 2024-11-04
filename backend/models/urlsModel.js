import mongoose from "mongoose";

const UrlsSchema = new mongoose.Schema(
  {
    shortUrlId: {
      type: String,
      required: true,
    },
    originalUrl: {
      type: String,
      required: true,
    },
    shortUrl: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Urls = mongoose.model('url', UrlsSchema);

export default Urls;