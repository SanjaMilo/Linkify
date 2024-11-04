import { nanoid } from 'nanoid';
import Urls from '../models/urlsModel.js';
import { isValidUrl, generateUniqueShortID } from '../utils.js';
// Install nanoid package if you want to use it

export const getAllUrls = async (req, res) => {
    const urls = await Urls.find({});

    res.status(200).json(urls); 
};

export const createShortUrl = async (req, res) => {
    const { originalUrl } = req.body;
    const baseUrl = process.env.BASE_URL;
    
    // Generate shortUniqueID
    // const urlId = nanoid(); 
    // const urlId = nanoid(7); // define the length of 7 characters
    const shortUrlId = generateUniqueShortID();

    if (isValidUrl(originalUrl)) {
      try {
        let urls = await Urls.findOne({ originalUrl }); // null if not found

        if (urls) {
            res.status(200).json({shortUrl: urls.shortUrl, message: "Short link already exists!"}); // Already in the database

        } else {
          const shortUrl = `${baseUrl}/${shortUrlId}`;
  
          urls = new Urls({
            originalUrl,
            shortUrl,
            shortUrlId,
          });
  
          await urls.save();
          res.status(201).json(urls); // Created new 'urls' object (containing original-url, short-url and the short-url Id)
        }
      } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Server error'});
      }
    } else {
      res.status(400).json({ error: 'Invalid Original Url'});
    }
};

export const getShortUrl = async (req, res) => {
  const { shortUrlId }  = req.body;
  
    try {
      const urls = await Urls.findOne({ shortUrlId }); // we get the shortUrlId from the request object's params property (url parameter)
      console.log('URLS', urls)
      if (urls) {
        res.status(200).json({ originalUrl: urls.originalUrl });

      } else {
        res.status(404).json({ error: 'Cannot find this URL!' });
      }

    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Server error'});
    }
};