import { IsNotEmpty, IsNumber } from "class-validator"

export class CreateProjectAssignmentDto {
    @IsNotEmpty()
    @IsNumber()
    project: number
    
    @IsNotEmpty()
    @IsNumber()
    user: number

    @IsNotEmpty()
    @IsNumber()
    role: number
}
