import { isEmpty } from "class-validator";
import CreateUserDto from "../dto/User/create.user.dto";
import LoginUserDto from "../dto/User/login.user.dto";
import { HttpException } from "../exceptions/HttpException";
import User from "../interfaces/user.interface";
import userModel from "../models/user.model";
import { sign } from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../config";
import Token from "../interfaces/token.interface";
import { hash, compare } from "bcrypt";
import { DataStoredInToken, TokenData } from "../interfaces/auth.interface";
class userService {
  public user = userModel;

  public async findAll(): Promise<User[]> {
    const usuarios: User[] = await this.user.find().select("name email").exec();
    return usuarios;
  }

  public async create(userData: CreateUserDto): Promise<User> {
    if (!userData.email || !userData.name || !userData.password) {
      throw new HttpException(
        400,
        "Há parâmetros não fornecidos ao criar o usuario"
      );
    }
    const isEmailUsed = await this.user.findOne({
      email: userData.email,
    });

    if (isEmailUsed) throw new HttpException(400, "O Email já foi utilizado");

    const hashedPassword = await hash(userData.password, 10);
    const createdUser = await this.user.create({
      ...userData,
      password: hashedPassword,
    });

    return createdUser;
  }

  public async loginUser(
    userDto: LoginUserDto
  ): Promise<{ cookie: string; foundUsuario: User }> {
    if (isEmpty(userDto)) {
      throw new HttpException(400, "É necessário informar um usuário");
    }

    const findUsuario = await this.user
      .findOne({ email: userDto.email })
      .exec();
    if (!findUsuario) {
      throw new HttpException(
        404,
        "O usuário não existe, verifique o email e tente novamente."
      );
    }
    const foundUsuario = new this.user(findUsuario);
    const isPasswordMatching = await compare(
      userDto.password,
      foundUsuario.password
    );
    if (!isPasswordMatching) {
      throw new HttpException(400, "Senha incorreta");
    }
    const tokenData = this.createToken(foundUsuario);
    const cookie = this.createCookie(tokenData);
    return { cookie, foundUsuario };
  }

  public async logout(userData: User): Promise<User> {
    if (isEmpty(userData))
      throw new HttpException(400, "Forneça os dados do usuário");

    const findUser: User =
      (await this.user.findOne({
        email: userData.email,
        password: userData.password,
      })) || ({} as User);
    if (!findUser)
      throw new HttpException(
        409,
        `O email ${userData.email} não foi encontrado`
      );

    return findUser;
  }

  public createToken(user: User): TokenData {
    const dataStoredInToken: DataStoredInToken = { _id: user.id };
    const secretKey: string = JWT_SECRET_KEY as string;
    const expiresIn: number = 60 * 60;

    return {
      expiresIn,
      token: sign(dataStoredInToken, secretKey, { expiresIn }),
    };
  }

  public createCookie(tokenData: TokenData): string {
    return `Authorization=${tokenData.token}; Path=/; Max-Age=${tokenData.expiresIn}; HttpOnly; Secure; SameSite=Lax;`;
  }
}

export default userService;
