const requirePro = (req, res, next) => {
    if (!req.user.isPro) {
      return res.status(403).json({
        success: false,
        message: "Pro access required",
      });
    }
  
    next();
  };
  
  module.exports = requirePro;