const express = require('express');
const { signup, login, verifyAccounts,resendOTP, logout, forgetPassword, resetPassword, cleanupUnverifiedEmail } = require('../controller/authController');
const isAuthenticated = require('../middlewares/isAuthenticated');

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/verify-account", isAuthenticated, verifyAccounts);
router.post("/resend-otp",isAuthenticated,resendOTP);
router.post('/logout',logout);
router.post('/forget-password',forgetPassword);
router.post('/reset-password',resetPassword);
router.get('/cleanup-unverified-users',cleanupUnverifiedEmail);
router.get('/me',isAuthenticated,(req, res) => {
     if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  res.setHeader('Surrogate-Control', 'no-store');

  res.status(200).json({
    status: 'success',
    message: "new otp sent to your email",
    user: req.user
  });
});

// router.get('/cleanup-unverified', (req, res, next) => {
//   const cronSecret = process.env.CRON_SECRET;
//   if (req.query.secret !== cronSecret) {
//     return res.status(403).json({ message: 'Forbidden: Invalid secret token' });
//   }
//   next();
// }, userController.cleanupUnverifiedEmail);

module.exports = router;
