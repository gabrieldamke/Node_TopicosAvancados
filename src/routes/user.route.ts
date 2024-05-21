import { Router } from "express";
import { Routes } from "../interfaces/routes.interface";
import validationMiddleware from "../middlewares/validation.middleware";
import UserController from "../controllers/user.controller";
import CreateUserDto from "../dto/User/create.user.dto";
import LoginUserDto from "../dto/User/login.user.dto";
import authMiddleware from "../middlewares/auth.middleware";

class UserRoute implements Routes {
  public path = "/users";
  public router = Router();

  public userController = new UserController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.userController.getAllUsers);
    this.router.post(
      `${this.path}`,
      validationMiddleware(CreateUserDto, "body"),
      this.userController.createUser
    );
    this.router.post(
      `${this.path}/auth`,
      validationMiddleware(LoginUserDto, "body"),
      this.userController.loginUser
    );
  }
}

export default UserRoute;
