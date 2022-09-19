import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Question {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    author_id: number;

    @Column()
    question_title: string;

    @Column()
    question_body: string;

}
