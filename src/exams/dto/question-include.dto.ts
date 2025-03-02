import { ApiProperty } from "@nestjs/swagger";

export class QuestionIncludeDto {

  @ApiProperty({ type: Boolean, required: false })
  exams?: boolean;

  @ApiProperty({ type: Boolean, required: false })
  alternatives?: boolean;

}
