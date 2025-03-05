import { ApiProperty } from "@nestjs/swagger";

export class CourseIncludeDto {

  @ApiProperty({ name: 'topics', type: Boolean, required: false })
  private _topics?: boolean = false;

  public get topics(): boolean {
    return this._topics;
  }
  public set topics(value: boolean) {
    this._topics = value as any === 'true';
  }
}
