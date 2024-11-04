import validator from "validator";

//* Simple validating function (just checking protocol and hostname). Not using regex
export const isValidUrl = (urlString) => {
  if (urlString.length < 100) return false; // URL string is already short enough.

  try {
    const url = new URL(urlString); // instantiate an url object

    if ((url.protocol === "https:" || url.protocol === "http:" || url.protocol === "ftp:") && url.hostname !== "") {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

//* Second option is to use package library 
// export const isValidUrl = (urlString) => {
//   if (urlString.length() < 100) return false; // URL string is already short enough.

//   if (validator.isURL(urlString)) {
//     return true;
//   } else {
//     return false;
//   }
// };

export const generateUniqueShortID = () => {
  const shortId = Math.random().toString(36).slice(-7);
  return shortId;
};


