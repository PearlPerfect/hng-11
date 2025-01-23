const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  
    const token = authHeader.split(' ')[1];
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = decoded.userId; // Attach user ID to request object
      next();
    } catch (error) {
      res.status(401).json({ message: 'Unauthorized' });
    }
  };
  

  module.exports = verifyJWT
  
  // app.get('/protected-resource', verifyJWT, (req, res) => {
  //   // Access user data using req.userId (if needed)
  //   res.json({ message: 'Welcome to the protected resource' });
  // });
  