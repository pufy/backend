import { ApiModelProperty } from '@nestjs/swagger';
import { Length, IsEmail } from 'class-validator';

export class LoginDto {

    @ApiModelProperty()
    @IsEmail({}, { message: "El correo no cumple con su formato" }) 
    correo: string;
    
    @ApiModelProperty()
    @Length(4, 30, { message: "La contraseña debe estar entre 4 a 30 letras" }) 
    contrasena: string;
}