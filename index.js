require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const Link = require("./models/link");

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  Link.find({})
    .then((links) => {
      const styleHtml = `<style>
      .useful-links {
        background-color: #f8f9fa;
        border: 1px solid #f1f3f5;
        border-radius: 4px;
        padding: 10px;
        margin: 10px 0;
      }
      .useful-links a {
        text-decoration: none;
        color: #007bff;
        padding: 0 5px;
      }
      .useful-links a:hover {
        text-decoration: underline;
      }
    </style>`;
      const linkHtml = links
        .map((link) => `<a href="${link.link}">${link.name}</a>`)
        .join("");
      const responseHtml = `<div class="useful-links">
  <strong>THÔNG TIN THÊM:</strong>${linkHtml} |
  </div>${styleHtml}`;

      if (links.length !== 0) {
        res.send(responseHtml);
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error.message);
    });
});

app.post("/api/links", (req, res) => {
  const body = req.body;
  if (!body.name || !body.link) {
    return res.status(400).json({
      error: "content missing",
    });
  }

  const link = new Link({
    name: req.body.name,
    link: req.body.link,
  });

  link
    .save()
    .then((link) => {
      res.status(201).json(link);
    })
    .catch((error) => {
      res.status(500).send(error.message);
    });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
