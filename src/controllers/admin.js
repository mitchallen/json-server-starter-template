const express = require('express')
const router = express.Router()

const X_ADMIN_HEADER_KEY = 'x-admin-key'
const DEFAULT_ADMIN_KEY_VALUE = 'admin-key'

// Middleware function to check 'x-admin-key'
const checkAdminKey = function (req, res, next) {
  const adminKey = req.get(X_ADMIN_HEADER_KEY);
  const validAdminKey = DEFAULT_ADMIN_KEY_VALUE; // TODO lookup key
  console.log(`DEBUG: ${adminKey} vs ${validAdminKey}`)
  if (adminKey === validAdminKey) {
    next(); // If key is valid, proceed to the next middleware or route handler
  } else {
    console.debug("ADMIN IS FORBIDDEN!")
    // Send 403 Forbidden if API key is invalid
    // https://gist.github.com/weapp/99049e69477f924dafa7
    res.status(403).json({ "error": { "status_code": 403, "status": "Forbidden" } });
  }
}

router.use(checkAdminKey)

router.get("/kill", (_, res) => {
    setTimeout(() => {
      const exitCode = 0
      console.log(`Process will exit with code: ${exitCode}`)
      process.exit(exitCode);
    }, 1000)
  
    res.status(200).json({status: "OK"})
  });

module.exports = router