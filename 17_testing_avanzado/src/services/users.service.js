import { UsersRepository } from "../repository/users.repository.js";
import usersDaoMemory from "../dao/users.dao.js";

class UsersService {
  async getPublicUser(user) {
    let usersRepository = new UsersRepository()
    return usersRepository.getPublicUser(user);
  }
  async updateUserRol(uidUser){
    return usersDaoMemory.updateUserRol(uidUser);
  }
  async getUserById(uidUser){
    return usersDaoMemory.getUserById(uidUser);
  }
  async deleteUserById(uidUser){
    return usersDaoMemory.deleteUserById(uidUser);
  }
}
const usersService = new UsersService()
export default usersService;
