import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Exclude, Expose, instanceToPlain } from "class-transformer";
import { CourseEntity } from "./course.entity";
// import { CourseTopicsCreateDtoType } from "../dto/question-create.dto";

@Entity('courses_topics')
export class CourseTopicEntity {

  @PrimaryGeneratedColumn("uuid")
  @ApiProperty({
    type: String,
    format: 'uuid',
  })
  public id: string;

	@Column({ name: 'course_id' })
	@ApiProperty({ type: String })
	courseId: CourseEntity['id'];

  /**
   * Only `kebab-case`.
   */
  @Column({ unique: true, nullable: true })
  @ApiProperty({ type: String })
  @Exclude()
  private _tag: string;

  @Expose()
  public get tag(): string | undefined {
    return this._tag;
  }
  public set tag(value: string) {
    this._tag = `${value}`.toLowerCase().replaceAll(" ", "_");
  }


  @Column()
  @ApiProperty({ type: String, })
  public name: string;

  @Column()
  @ApiProperty({ type: Number, })
  public order: number;


  @ManyToOne(() => CourseEntity, (course: CourseEntity) => course.topics, {
    onDelete: 'CASCADE'
  })
	@JoinColumn({ name: 'course_id' })
  course: CourseEntity;


  public toJSON() {
    return instanceToPlain(this);
    // return plainToClass(CourseTopicsEntity, this);
  }
}
