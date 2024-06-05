import { OmitType } from "@nestjs/swagger";
import { ExamEntity } from "../entities/exam.entity";

export class CreateExamDto extends OmitType(ExamEntity, ['id'] as const) {

}
