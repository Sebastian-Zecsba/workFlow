import { Optional } from "@nestjs/common"
import { IsNotEmpty, IsString } from "class-validator"

export class CreateOrganizationDto {

    @IsNotEmpty({message: "El nombre de la empresa/organización es obligatoria"})
    @IsString()
    name: string

    @Optional()
    plan?: string

}
