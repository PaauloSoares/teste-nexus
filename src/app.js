const express = require("express");
const path = require("path");
const app = express();
const userRoutes = require("./routes/userRoutes.js");
const simulacoesRoutes = require("./routes/simulacoes.js");
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/users/simulacoes", simulacoesRoutes);

app.get("/teste", (req, res) => {
  res.status(200).send({ mensagem: "boas-vindas à API" });
});

if (process.env.NODE_ENV === "production") {
  const frontendPath = path.join(__dirname, "..", "frontend", "dist");
  app.use(express.static(frontendPath));
  app.get("*", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
}

module.exports = app;
