import { ApiHideProperty, OmitType } from "@nestjs/swagger";
import { UserEntity } from "../entities/user.entity";
import { randomUUID } from "crypto";


export class UserCreateDto extends OmitType(UserEntity, ["id"]) {

	/** Não é necessário informar o ID, pois ele sera gerado automaticamente. */
	@ApiHideProperty()
	id: UserEntity['id'];

	constructor() {
		super();
		this.id = randomUUID();
	}
}
