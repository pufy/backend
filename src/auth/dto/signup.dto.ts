import { ApiModelProperty } from '@nestjs/swagger';
import { Length, IsEmail, IsDateString, IsEnum, IsNotEmpty } from 'class-validator';

export enum Gender {
    M = "M",
    F = "F"
  }

export class SignupDto {

    @ApiModelProperty()
    @Length(3, 50, { message: "El nombre debe estar entre 3 a 50 letras" })
    nombres: string;
    
    @ApiModelProperty()
    @Length(3, 50, { message: "El apellido debe estar entre 3 a 50 letras" })
    apellidos: string;

    @ApiModelProperty({ enum: ['M', 'F'] })
    @IsNotEmpty()
    @IsEnum(Gender)
    genero: string;
    
    @ApiModelProperty()
    @IsEmail({}, { message: "El correo no cumple con su formato" }) 
    correo: string;

    @ApiModelProperty()
    fk_nacionalidad: string;

    @ApiModelProperty()
    @Length(4, 30, { message: "La contraseña debe estar entre 4 a 30 letras" }) 
    contrasena: string;

    @ApiModelProperty()
    @Length(10, 15, { message: "El celular debe estar entre 10 a 15 números" })
    celular: string;
    
    @ApiModelProperty()
    @IsDateString() 
    fecha_nacimiento: string;
}