import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateContact1627491652121 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "contact",
                columns:[
                    { 
                        name: "id", 
                        type: "integer", 
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    { 
                        name: "firstName", 
                        type: "varchar"
                    },
                    { 
                        name: "lastName", 
                        type: "varchar"
                    },
                    { 
                        name: "email", 
                        type: "varchar"
                    },
                    { 
                        name: "telefones", 
                        type: "varchar"
                    },
                    { 
                        name: "createdAt", 
                        type: "timestamp",
                        default: "now()"
                    }                
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("contact");
    }

}
