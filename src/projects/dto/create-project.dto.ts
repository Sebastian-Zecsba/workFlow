import { IsDate, IsDateString, IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator"

export class CreateProjectDto {
    @IsString({ message: "El nombre debe ser una cadena de texto" })
    @IsNotEmpty({ message: "El nombre del proyecto es obligatorio" })
    @MaxLength(100, { message: "El nombre no puede exceder los 100 caracteres" })
    name: string

    @IsString({ message: "La descripción debe ser una cadena de texto" })
    description: string // Opcional, como en el ERD

    @IsDateString({}, { message: "Fecha de inicio no válida" })
    @IsNotEmpty({ message: "La fecha de inicio es obligatoria" })
    start_date: string

    @IsDateString({}, { message: "Fecha de fin no válida" })
    @IsNotEmpty({ message: "La fecha de fin es obligatoria" })
    end_date: string
}