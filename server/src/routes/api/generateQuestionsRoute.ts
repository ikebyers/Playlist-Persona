import express from "express";
import generateQuestions from "../../services/gptServices.js";

const router = express.Router();

router.get("/api/generate-questions", async (_req, res) => {
    try {
        const questions = await generateQuestions();
        res.json(questions);
    } catch (error) {
        res.status(500).json({ error: "Failed to generate questions" });
    }
});

export default router;