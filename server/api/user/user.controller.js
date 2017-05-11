export const index = (req, res) => {
  res.json({ test: 'test' });
};

export const me = (req, res) => {
  res.json(req.user);
};
