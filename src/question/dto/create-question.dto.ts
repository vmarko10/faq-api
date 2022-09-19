import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateQuestionDto {
    
    @IsNotEmpty()
    @IsString()
    question_title: string;

    @IsNotEmpty()
    @IsString()
    question_body: string;

    @IsNotEmpty()
    @IsNumber()
    category_id: number;
}
