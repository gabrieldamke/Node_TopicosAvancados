import { NextFunction, Request, Response } from "express";
import CreateUserDto from "../dto/User/create.user.dto";
import userService from "../services/user.service";
import User from "../interfaces/user.interface";
import LoginUserDto from "../dto/User/login.user.dto";
import GetAllUserDto from "../dto/User/GetAll.user.dto";
import { RequestWithUser } from "../interfaces/auth.interface";

class UserController {
  public userService = new userService();

  /**
   * @swagger
   * /users:
   *   get:
   *     tags:
   *       - User
   *     summary: Lista todos os usuarios
   *     description: Retorna uma lista de todos os usuarios.
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: Lista de usuarios obtida com sucesso
   *         schema:
   *           type: array
   *           items:
   *             $ref: '#/definitions/GetAllUserDto'
   */
  public getAllUsers = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const findAllEventosData: GetAllUserDto[] =
        await this.userService.findAll();
      res.status(200).json({ data: findAllEventosData, message: "findAll" });
    } catch (error) {
      next(error);
    }
  };

  /**
   * @swagger
   * /users:
   *   post:
   *     tags:
   *       - User
   *     summary: Cria um novo usuário
   *     description: Cria um novo usuário com os dados fornecidos.
   *     consumes:
   *       - application/json
   *     parameters:
   *       - in: body
   *         name: body
   *         description: Objeto de usuário para criação
   *         required: true
   *         schema:
   *           $ref: '#/definitions/CreateUserDto'
   *     responses:
   *       201:
   *         description: Usuário criado com sucesso
   *         schema:
   *           $ref: '#/definitions/User'
   *       400:
   *         description: Dados inválidos fornecidos
   */
  public createUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userData: CreateUserDto = req.body;
      const createEventoData: User = await this.userService.create(userData);

      res.status(201).json({ data: createEventoData, message: "created" });
    } catch (error) {
      next(error);
    }
  };

  /**
   * @swagger
   * /users/auth:
   *   post:
   *     tags:
   *       - User
   *     summary: Autentica um usuário
   *     description: Autentica um usuário com as credenciais fornecidas.
   *     consumes:
   *       - application/json
   *     parameters:
   *       - in: body
   *         name: body
   *         description: Objeto de usuário para autenticação
   *         required: true
   *         schema:
   *           $ref: '#/definitions/LoginUserDto'
   *     responses:
   *       200:
   *         description: Autenticação bem-sucedida
   *         schema:
   *           $ref: '#/definitions/Token'
   *       401:
   *         description: Credenciais inválidas fornecidas
   */
  public loginUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userData: LoginUserDto = req.body;

      const { cookie, foundUsuario } = await this.userService.loginUser({
        email: userData.email,
        password: userData.password,
      });

      res.setHeader("Set-Cookie", [cookie]);

      res.status(200).json({ data: foundUsuario, message: "authenticated" });
    } catch (error) {
      next(error);
    }
  };

  /**
   * @swagger
   * /users/logout:
   *   post:
   *     tags:
   *       - User
   *     summary: Desautentica um usuário
   *     description: Remove a autorização definida no cabeçalho.
   *     consumes:
   *       - application/json
   *     parameters:
   *       - in: body
   *         name: body
   *         description: Objeto do usuário desautenticado
   *         required: true
   *         schema:
   *           $ref: '#/definitions/User'
   *     responses:
   *       200:
   *         description: Desautenticação bem-sucedida
   *         schema:
   *           $ref: '#/definitions/Token'
   */
  public logOutUser = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userData: User = req.user;
      const logOutUserData: User = await this.userService.logout(userData);

      res.setHeader("Set-Cookie", ["Authorization=; Max-age=0"]);
      res.status(200).json({ data: logOutUserData, message: "logout" });
    } catch (error) {
      next(error);
    }
  };
}

export default UserController;
