export interface ITour {
	id: string;
	name: string;
	description: string;
	price: string;
	tourOperator: string;
	img: string;
	type?: string;
	date?: string;
	createdAt?: string;
	avatar?: string;
	firstName?: string;
	lastName?: string;
	cardNumber?: string;
	birthDate?: string;
	age?: number;
	citizenship?: string;
	locationId: string;
}

export interface TourType {
	key: string;
	label: string;
}
