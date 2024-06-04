import { ApiExtraModels, ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsUUID, Matches } from "class-validator";

@ApiExtraModels(SearchUserDto)
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
	@Matches(
		new RegExp(/^([0-9A-Fa-f]{2}(-|:|3%A|)){5}([0-9A-Fa-f]{2})$/igm),
		{
			message: '"Endereço MAC Celular" com formato invalido'
		})
	readonly name: string;

}
