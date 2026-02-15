import Ppt from "../models/pptModel.js";

const savePpt = async (req, res) => {
  try {
    const { topic, htmlContent } = req.body;

    if (!topic || !htmlContent) {
      return res.status(400).json({
        success: false,
        message: "topic and htmlContent are required",
      });
    }

    const isValidHtml = htmlContent.includes("</html>");

    const ppt = await Ppt.create({
      topic: topic.trim(),
      htmlContent,
      status: isValidHtml ? "generated" : "incomplete",
      charCount: htmlContent.length,
    });

    return res.status(201).json({
      success: true,
      message: "Presentation saved successfully",
      data: {
        id: ppt._id,
        topic: ppt.topic,
        status: ppt.status,
        createdAt: ppt.createdAt,
      },
    });
  } catch (error) {
    console.error("Save PPT Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to save presentation",
      error: error.message,
    });
  }
};

export default {
  savePpt,
};
