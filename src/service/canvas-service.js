
import CanvasRepository from "../repository/canvas-repo.js";

const canvasRepository = new CanvasRepository();

export const saveCanvasService = async (data) => {
    try {
        if (data.id) {
            const updatedCanvas = await CanvasRepository.update(data.id, {
                title: data.title,
                snapshot: data.snapshot
            });
            return updatedCanvas;
        }
        const newCanvas = await canvasRepository.create({
            title: data.title || "Untitled Canvas",
            snapshot: data.snapshot
        });
        return newCanvas;
    } catch (error) {
        console.error("Error in saveCanvasService:", error);
        throw error;
    }
};

export const getCanvasByIdService = async (id) => {
    try {
        const canvas = await canvasRepository.get(id);
        if (!canvas) throw new Error("Canvas not found");
        return canvas;
    } catch (error) {
        console.error("Error in getCanvasByIdService:", error);
        throw error;
    }
};