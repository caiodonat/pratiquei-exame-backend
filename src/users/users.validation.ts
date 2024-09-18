import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";

@ValidatorConstraint({ name: 'customText', async: false })
export class CustomNameValidator implements ValidatorConstraintInterface {
  validate(text: string, args: ValidationArguments) {
	const specialTest = RegExp(/[\W]/g);
	
	const res = !specialTest.test(text);
	
	console.debug(`specialTest:`, specialTest.test(text));
	// console.debug(`whitespaceTest:`, whitespaceTest.test(text));

	return res;
  }
}