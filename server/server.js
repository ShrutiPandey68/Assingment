import { app } from "./app.js";
import Razorpay from "razorpay";
import { connectDB } from "./config/database.js";
import OpenAI from 'openai';
import cors from 'cors';
import multer from 'multer';
import bodyParser from 'body-parser';
connectDB();

export const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET_KEY,
});
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Use the OpenAI API key
});
const upload = multer();



app.post('/api/analyze-image', async (req, res) => {
  debugger;
  const { imageUrl } = req.body;
  console.log("Received image URL:", imageUrl);
  console.log(process.env.OPENAI_API_KEY);

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: "What’s in this image?" },
            {
              type: "image_url",
              image_url: { url: imageUrl },
            },
          ],
        },
      ],
    });
    console.log("OpenAI Response:", response);
    res.json(response.choices[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Image analysis failed.' });
  }
});

app.post('/api/analyze-image-base64', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded.' });
  }

  const mimeType = req.file.mimetype;
  if (!mimeType.startsWith("image/")) {
    return res.status(400).json({ error: 'Uploaded file is not an image.' });
  }

  try {
    // Convert the uploaded file to base64
    const base64Image = req.file.buffer.toString('base64');
    const imageDataUrl = `data:${mimeType};base64,${base64Image}`;
    console.log("Image Data URL:", imageDataUrl); // Log for debugging

    // Send the base64 image to OpenAI for analysis
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: "What’s in this image?",
        },
        {
          role: "user",
          content: imageDataUrl, // Send the data URL directly as a string
        },
      ],
    });

    console.log("OpenAI Response:", response);
    res.json(response.choices[0]);
  } catch (error) {
    console.error('OpenAI API Error:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Image analysis failed.' });
  }
});


app.listen(process.env.PORT, () =>
  console.log(`Server is working on ${process.env.PORT}`)
);
app.use(cors());
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));