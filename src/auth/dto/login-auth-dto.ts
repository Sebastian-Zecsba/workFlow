import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class LoginDTO {
    
    @IsNotEmpty({ message: 'El nombre de usuario es obligatorio' })
    @IsString({ message: 'El nombre de usuario debe ser una cadena de texto' })
    username: string;

    @IsNotEmpty({ message: 'La contraseña es obligatoria' })
    @IsString({ message: 'La contraseña debe ser una cadena de texto' })
    @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
    password: string;

}
