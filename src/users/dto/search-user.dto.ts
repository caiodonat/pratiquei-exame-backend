import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsUUID, Min } from "class-validator";


export class SearchUserDto {

	@ApiProperty({
		type: String,
		format: 'uuid',
		required: false
	})
	@IsOptional()
	@IsUUID()
	id: string;

	@ApiProperty({
		type: String,
		required: false
	})
	@IsOptional()
	@Min(6, {
		message: '"Nome" deve ser maior que 6'
	})
	readonly name: string;

}
