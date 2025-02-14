import { PartialType } from '@nestjs/swagger';
import { CreateExamDto } from './exam-create.dto';

export class UpdateExamDto extends PartialType(CreateExamDto) {}
