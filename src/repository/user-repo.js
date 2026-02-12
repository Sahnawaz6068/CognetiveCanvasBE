import User from "../models/userModel.js";
import crudRepository from "./crud-repo.js";

class UserRepository extends crudRepository {
    constructor(){
        super(User)
    }
}

export default UserRepository;