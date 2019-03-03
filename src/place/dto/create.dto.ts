import { ApiModelProperty } from '@nestjs/swagger';
import { Length, IsEmail, IsDateString, IsEnum, IsNotEmpty } from 'class-validator';

export class CreateDto {

    @ApiModelProperty()
    @Length(3, 50, { message: "El nombre debe estar entre 3 a 50 letras" })
    name: string;
    
    @ApiModelProperty()
    @Length(3, 50, { message: "El apellido debe estar entre 3 a 50 letras" })
    fk_category: number;
    
    @ApiModelProperty()
    @IsEmail({}, { message: "El correo no cumple con su formato" }) 
    email: string;

    @ApiModelProperty()
    @Length(4, 30, { message: "La contraseña debe estar entre 4 a 30 letras" }) 
    password: string;

    @ApiModelProperty()
    @Length(10, 15, { message: "El celular debe estar entre 10 a 15 números" })
    telephone: string;
}