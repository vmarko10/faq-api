import { IsNotEmpty, IsNumber, MaxLength, MinLength } from "class-validator";

export class CreateAnswerDto {

    @IsNotEmpty()
    @IsNumber()
    question_id: number;

    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(500)
    answer_body: string;
}