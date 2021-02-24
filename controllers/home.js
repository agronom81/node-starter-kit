exports.index = (req, res) => {
  res.render("home", {
    title: "Home",
    header: "This is Node Starter Kit",
  });
};
