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
    @IsNotEmpty()
    popularity: number;

    @ApiModelProperty()
    @IsBoolean()
    is_local: boolean;

    @ApiModelProperty()
    @IsNumber()
    duration_ms: number;

    @ApiModelProperty()
    @IsNotEmpty()
    href: string;
    
    @ApiModelProperty()
    @IsNotEmpty()
    album: Album[];

    @ApiModelProperty()
    @IsNotEmpty()
    artists: Artist[];
}

class Album {

    @ApiModelProperty()
    @IsNotEmpty()
    id: string;
    
    @ApiModelProperty()
    @IsNotEmpty()
    name: string;

    @ApiModelProperty()
    @IsNotEmpty()
    uri: string;

    @ApiModelProperty()
    @IsNumber()
    total_tracks: number;

    @ApiModelProperty()
    @IsNumber()
    duration_ms: number;

    @ApiModelProperty()
    @IsNotEmpty()
    href: string;
    
    @ApiModelProperty()
    @IsNotEmpty()
    release_date: string;

    @ApiModelProperty()
    @IsNotEmpty()
    images: Images[];

    @ApiModelProperty()
    @IsNotEmpty()
    artists: Artist[];
}

class Images{

    @ApiModelProperty()
    @IsNotEmpty()
    url: string;

    @ApiModelProperty()
    @IsNumber()
    height: number;

    @ApiModelProperty()
    @IsNumber()
    width: number;
}

class Artist{

    @ApiModelProperty()
    @IsNotEmpty()
    id: string;
    
    @ApiModelProperty()
    @IsNotEmpty()
    name: string;
    
    @ApiModelProperty()
    @IsNotEmpty()
    uri: string;

    @ApiModelProperty()
    @IsNotEmpty()
    href: string;
}