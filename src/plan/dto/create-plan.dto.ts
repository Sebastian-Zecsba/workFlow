import { IsNumber, IsString } from "class-validator"

export class CreatePlanDto {

    @IsString()
    name: string

    @IsNumber()
    max_projects: number

    @IsNumber()
    max_users: number   
}
