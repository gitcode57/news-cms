const jwt = require('jsonwebtoken');

const isLoggedIn = (req, res, next) => {
    try{
        const token = req.cookies.token;
        if(!token) return res.redirect('/admin/');
        const tokenData = jwt.verify(token, process.env.JWT_SECRET);
        req.user = tokenData;
        req.role = tokenData.role;
        req.fullname = tokenData.fullname;
        next();
    } catch (error) {
      res.status(401).send('Unauthorized :Invalid Token')
    }
};

module.exports = isLoggedIn;