import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (email && password) {
    res.json({
      token: "fake-jwt-token",
      user: { id: 1, name: "Test User", email }
    });
  } else {
    res.status(400).json({ message: "Missing credentials" });
  }
});

app.post('/logout', (req, res) => {
  res.json({ message: "Logged out" });
});

app.get('/me', (req, res) => {
  res.json({
    user: { id: 1, name: "Test User", email: "staff@example.com" }
  });
});

app.listen(5000, () => console.log("Mock backend running on port 5000"));
