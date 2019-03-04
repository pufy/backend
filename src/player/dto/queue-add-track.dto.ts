import { ApiModelProperty } from '@nestjs/swagger';
import { IsNumber, IsNotEmpty, IsBoolean } from 'class-validator';

export class QueueAddTrackDto {

    @ApiModelProperty()
    @IsNotEmpty()
    id: string;
    
    @ApiModelProperty()
    @IsNotEmpty()
    name: string;

    @ApiModelProperty()
    @IsNumber()
    duration_ms: number;
    
    @ApiModelProperty()
    @IsNotEmpty()
    album: string;

    @ApiModelProperty()
    @IsNotEmpty()
    image: string[];

    @ApiModelProperty()
    @IsNotEmpty()
    artist: string[];
}