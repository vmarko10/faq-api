import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

const config: PostgresConnectionOptions = {
    type: "postgres",
    database: "faq",
    username: "faquser",
    password: "faqpass",
    entities: ['dist/src/**/*.entity.js']
}

export default config;