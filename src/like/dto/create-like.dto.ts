import { IsBoolean, IsNotEmpty, IsNumber } from "class-validator";

export class CreateLikeDto {
    @IsNotEmpty()
    @IsNumber()
    author_id: number;

    @IsNotEmpty()
    @IsNumber()
    answer_id: number;

    @IsNotEmpty()
    @IsBoolean()
    isLike: boolean;
}
