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

const getAllPPT = async (req, res) => {
  try {
    const ppts = await Ppt.find()
      .select("topic status charCount createdAt ")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: ppts.length,
      data: ppts,
    });
  } catch (error) {
    console.error("Get All PPT Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch presentations",
    });
  }
};


export default {
  savePpt,
  getAllPPT
};
