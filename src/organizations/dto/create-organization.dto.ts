import { IsDateString, IsNotEmpty, IsOptional, IsString } from "class-validator"

export class CreateOrganizationDto {

    @IsNotEmpty({message: "El nombre de la empresa/organización es obligatoria"})
    @IsString()
    name: string

    @IsOptional()
    plan?: string

    @IsOptional()
    @IsString()
    subscription_status: string;

    @IsOptional()
    @IsDateString()
    billing_cycle_start?: string;
    
    @IsOptional()
    @IsDateString()
    billing_cycle_end?: string;

}
