import { ApiProperty } from "@nestjs/swagger";

export class QuestionSelectDto {

  id: boolean = true;

  @ApiProperty({ type: Boolean, required: false })
  code?: boolean;

  @ApiProperty({ type: Boolean, required: false })
  typeCode?: boolean;


  @ApiProperty({ type: Boolean, required: false })
  title?: boolean;

  @ApiProperty({ type: Boolean, required: false })
  subject?: boolean;

  @ApiProperty({ type: Boolean, required: false })
  description?: boolean;

  @ApiProperty({ type: Boolean, required: false })
  discursiveAnswer?: boolean;


  @ApiProperty({ type: Boolean, required: false })
  isValidated?: boolean;

  @ApiProperty({ type: Boolean, required: false })
  createdAt?: boolean;

  constructor(entity?: QuestionSelectDto) {
    if (entity) {

      if (entity.code) this.code = entity.code as any === 'true';
      if (entity.typeCode) this.typeCode = entity.typeCode as any === 'true';

      if (entity.title) this.title = entity.title as any === 'true';
      if (entity.subject) this.subject = entity.subject as any === 'true';
      if (entity.description) this.description = entity.description as any === 'true';
      if (entity.discursiveAnswer) this.discursiveAnswer = entity.discursiveAnswer as any === 'true';
      
      if (entity.isValidated) this.isValidated = entity.isValidated as any === 'true';
      if (entity.createdAt) this.createdAt = entity.createdAt as any === 'true';
    }
  }
}