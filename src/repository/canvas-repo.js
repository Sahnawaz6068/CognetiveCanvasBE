import Canvas from "../models/canvasModel.js";
import crudRepository from "./crud-repo.js";

class CanvasRepository extends crudRepository {
    constructor() {
        super(Canvas);
    }
    async findByOwner(userId) {
        try {
            const documents = await this.model.find({ owner: userId });
            return documents;
        } catch (error) {
            console.error("Something went wrong in Canvas Repository");
            throw error;
        }
    }
}

export default CanvasRepository;