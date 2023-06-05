export interface User {
    firstName: string;
    lastName: string;
    middleName?: string;
    email: string;
    birthdate: Date;
    username: string;
    password: string;
    listOfInterest: string[];
}
