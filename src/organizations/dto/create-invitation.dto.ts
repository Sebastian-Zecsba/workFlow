import { IsEmail, IsNotEmpty } from "class-validator";

export class InvitationDTO{
    @IsEmail({}, {message: 'Correo no valido'})
    @IsNotEmpty({message: 'El correo es obligatorio'})
    email: string

    @IsNotEmpty({message: 'El Rol es obligatorio'})
    role: string
}