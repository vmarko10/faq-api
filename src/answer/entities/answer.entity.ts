import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Answer {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    question_id: number;

    @Column()
    author_id: number;

    @Column()
    answer_body: string;

    @Column()
    like_count: number;

    @Column()
    dislike_count: number;

}
