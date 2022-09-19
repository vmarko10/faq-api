import { IsNotEmpty } from "class-validator";

export class CreateQuestionDto {
    
    @IsNotEmpty()
    question_title: string;

    @IsNotEmpty()
    question_body: string;

}
