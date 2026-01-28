import { IsNotEmpty, IsString, MinLength, isNotEmpty, minLength } from "class-validator";

export class createNoteDto{

    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    title: string

    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    content: string

}