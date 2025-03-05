import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { instanceToPlain } from "class-transformer";
import { CourseTopicEntity } from "./topics.entity";
// import { CourseCreateDtoType } from "../dto/question-create.dto";

@Entity('courses')
export class CourseEntity {

  @PrimaryGeneratedColumn("uuid")
  @ApiProperty({
    type: String,
    format: 'uuid',
  })
  public id: string;
  
	/**
	 * Only `kebab-case`.
	 */
	@Column({ unique: true, nullable: true })
	@ApiProperty({ type: String })
	public code: string;


  @Column()
  @ApiProperty({ type: String, })
  public name: string;


  @OneToMany(() => CourseTopicEntity, (topics: CourseTopicEntity) => topics.course, {
    onDelete: 'CASCADE'
  })
  topics: CourseTopicEntity[];


  public toJSON() {
    return instanceToPlain(this);
    // return plainToClass(CourseEntity, this);
  }
}
