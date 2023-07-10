import { UsersRepository } from "../repository/users.repository.js";

class UsersService {
  getPublicUser(user) {
    let usersRepository = new UsersRepository()
    return usersRepository.getPublicUser(user);
  }
}
const usersService = new UsersService()
export default usersService;
