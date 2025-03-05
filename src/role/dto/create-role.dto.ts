import { IsNotEmpty, IsString } from "class-validator";

export class CreateRoleDto {

    @IsNotEmpty({ message: 'El Role debe ser obligatorio' })
    @IsString({ message: 'El Role debe ser una cadena de texto' })
    name: string
}
