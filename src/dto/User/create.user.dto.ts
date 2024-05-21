import { IsString } from "class-validator";

export default class CreateUserDto {
  @IsString()
  name!: string;

  @IsString()
  email!: string;

  @IsString()
  password!: string;
}

