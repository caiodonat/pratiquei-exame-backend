import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { Exclude, Expose, Transform } from 'class-transformer';
import { IDS_SELECTION } from '../enum/isdSelections.enum';

export class AppSearchDto {

	@ApiProperty({
		name: 'selection',
		type: String,
		enum: IDS_SELECTION,
		isArray: true,
		required: false
	})
	@IsEnum(IDS_SELECTION, { each: true })
	@IsOptional()
	private _selection?: IDS_SELECTION[];

	@ApiProperty({
		type: Number,
		required: false,
		default: 0
	})
	@IsOptional()
	@Transform(({ value }) => Number.parseInt(`${value}`))
	pageIndex?: number | undefined = 0;

	@ApiProperty({
		type: Number,
		required: false,
		default: 10
	})
	@IsOptional()
	@Transform(({ value }) => Number.parseInt(`${value}`))
	pageSize?: number | undefined = 10;

	@ApiProperty({
		name: 'sortBy',
		type: String,
		required: false,
	})
	@IsOptional()
	@Exclude()
	private _sortBy?: string | any;

	@ApiProperty({
		name: 'from',
		type: Date,
		required: false
	})
	@IsOptional()
	private _from?: Date;

	@ApiProperty({
		name: 'to',
		type: Date,
		required: false
	})
	@IsOptional()
	private _to?: Date;


	skip?: number;
	take?: number;

	@Expose()
	public get sortBy(): string | any {
		return this._sortBy;
	}
	public set sortBy(value: string | Object) {
		if (value && typeof value == 'string') {
			const prop = value.split('.')[0];
			const order = value.split('.')[1];
			const sort = {};

			// | "ASC" | "DESC"
			sort[prop] = order;
			this._sortBy = sort;
		} else if (typeof value == 'object') {
			this._sortBy = value;
		}
	};

	public get selection(): IDS_SELECTION[] {
		return this._selection;
	}
	public set selection(value: IDS_SELECTION[] | undefined) {
		if (typeof value === 'string') {
			this._selection = [value];
		} else {
			this._selection = value;
		}
	}

	public get from(): Date {
		return this._from;
	}
	public set from(value: Date | string | undefined) {
		if (value) {
			if (typeof value == 'string') {
				this._from = new Date(value);
			} else {
				this._from = value;
			}
		} else {
			this._from = new Date(0);
		}
	}

	public get to(): Date {
		return this._to;
	}
	public set to(value: Date | undefined) {

		if (value) {
			if (typeof value == 'string') {
				this._to = new Date(value);
			} else {
				this._to = value;
			}
		} else {
			this._to = new Date();
		}
		this._to.setUTCHours(23);
		this._to.setUTCMinutes(59);
		this._to.setUTCSeconds(59);

	}

	public calculatePagination() {
		// console.debug(this);
		this.pageSize = Number.parseInt(`${this.pageSize}`);
		this.pageIndex = Number.parseInt(`${this.pageIndex}`);

		this.take = this.pageSize;
		this.skip = this.pageSize * this.pageIndex;
	}
}


export class AppSearchReturnDto<T> {
	@ApiProperty({ type: Number })
	rowCount: number;

	@ApiProperty({ type: Object, isArray: true })
	result: T[];
}