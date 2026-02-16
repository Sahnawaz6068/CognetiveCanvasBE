import { saveCanvasService } from "../service/canvas-service.js";

export const createOrUpdateCanvas = async (req, res) => {
    try {
        const response = await saveCanvasService(req.body);
        return res.status(200).json({
            data: response,
            success: true,
            message: "Successfully processed canvas data",
            err: {}
        });
    } catch (error) {
        return res.status(500).json({
            data: {},
            success: false,
            message: "Something went wrong in the controller",
            err: error.message
        });
    }
};