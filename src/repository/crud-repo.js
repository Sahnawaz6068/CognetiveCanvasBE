class crudRepository {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    try {
      const result = await this.model.create(data);
      return result;
    } catch (error) {
      console.error("Crud Error:", error);
      throw error;
    }
  }

  async get(id) {
    try {
      const result = await this.model.findById(id);
      return result;
    } catch (error) {
      console.error("Crud Error:", error);
      throw error;
    }
  }

  async delete(id) {
    try {
      const result = await this.model.findByIdAndDelete(id);
      return result;
    } catch (error) {
      console.error("Crud Error:", error);
      throw error;
    }
  }

  async getAll() {
    try {
      const result = await this.model.findALl();
      return result;
    } catch (error) {
      console.error("Crud Error:", error);
      throw error;
    }
  }

  async update(id) {
    try {
      const result = await this.model.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
      });
      return result;
    } catch (error) {
      console.error("Crud Error:", error);
      throw error;
    }
  }
}

export default crudRepository;
