import { IsString } from "class-validator";

export default class GetAllUserDto {
  @IsString()
  email!: string;

  @IsString()
  name!: string;
}
