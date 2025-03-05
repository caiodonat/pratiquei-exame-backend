import { ApiProperty } from "@nestjs/swagger";


export class CourseSelectDto {

  id: boolean = true;

  @ApiProperty({ type: Boolean, required: false })
  code?: boolean;

  @ApiProperty({ type: Boolean, required: false })
  name?: boolean;

  constructor(entity?: CourseSelectDto) {
    if (entity) {

      if (entity.code) this.code = entity.code as any === 'true';
      if (entity.name) this.name = entity.name as any === 'true';
    }
  }
}
