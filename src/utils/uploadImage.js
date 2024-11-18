const cloudinary = require("cloudinary").v2;

require("dotenv").config(); 



cloudinary.config({
  cloud_name: 'dge2puorc',
  api_key: '984423531831313',
  api_secret: 'aFez8EM3MUQs4UGOeVfg-Sz4eqE',
});



// cloudinary.config({
//   cloud_name: 'dge2puorc',
//   api_key: '231675877752863',
//   api_secret: '_z7ax3BJ2jzgsIIq7MToiVNG8Tk',
// });

const opts = {
  overwrite: true,
  invalidate: true,
  resource_type: "auto",
};


module.exports = (image) => {
  //imgage = > base64
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(image, opts, (error, result) => {
      if (result && result.secure_url) {
         //console.log(result.secure_url);
        return resolve(result.secure_url);
      }
      console.log(error.message);
      return reject({ message: error.message });
    });
  });
};