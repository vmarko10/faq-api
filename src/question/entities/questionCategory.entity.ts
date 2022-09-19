import { Entity, PrimaryColumn } from "typeorm";

@Entity()
export class QuestionCategory {

    @PrimaryColumn()
    category_id: number;

    @PrimaryColumn()
    question_id: number;

}