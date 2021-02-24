module.exports = function (req, res, next) {
  res.status(404).render("pages/404", {
    title: "Page not found",
  });
};
