const { validateToken } = require("../service/auth");

function check(cookieName) {
   return (req, res, next) => {
      const TokenCookies = req.cookies[cookieName];

      if (!TokenCookies) {
         return next(); // Ensure early return to avoid multiple next() calls
      }

      try {
         const userpayload = validateToken(TokenCookies);
         req.user = userpayload;
      } catch (error) {
         // You may want to log the error or handle invalid token cases
      }
       return next();
   };
}

module.exports = { check };
