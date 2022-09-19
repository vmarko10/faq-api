import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Likes {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    author_id: number;

    @Column()
    answer_id: number;

    @Column()
    islike: boolean;
}
