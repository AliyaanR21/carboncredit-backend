export const isEmployerOrAdmin = (req, res, next) => {
  const { userRole } = req.user;
  if (userRole === 'employer' || userRole === 'Administrator') {
    return next();
  }
  return res.status(403).json({ message: 'Access denied. Employer or Administrator only.' });
};

export const isEmployee = (req, res, next) => {
  const { userRole } = req.user;
  if (userRole === 'employee') {
    return next();
  }
  return res.status(403).json({ message: 'Access denied. Employee only.' });
};
