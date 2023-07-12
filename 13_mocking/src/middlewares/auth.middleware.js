export const adminMiddleware = (req, res, next) => {
    if (req.isAuthenticated() && req.user.role === 'admin') {
      return next();
    } else {
      res.sendStatus(403);
    }
  };
  

export const userMiddleware = (req, res, next) => {
if (req.isAuthenticated() && req.user.role === 'user') {
    return next();
} else {
    res.sendStatus(403);
}
};
