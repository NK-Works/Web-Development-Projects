/* This code is made by Anneshu Nag, Student ID- 2210994760  */
/*                    Dated- 26/08/2023                      */

// Import the 'faker' library to generate fake data
import { faker } from "@faker-js/faker";

// Define an array of objects containing fake card data
const CardData = [
    {
        key: 0,
        image: faker.internet.avatar(), // Generate a fake avatar image URL
        name: faker.company.name(), // Generate a fake company name
        description: faker.commerce.productDescription(), // Generate a fake product description
        ratings: faker.helpers.rangeToNumber({ min: 1, max: 5 }), // Generate a random rating between 1 and 5
        first_name: faker.person.firstName(), // Generate a fake first name
        last_name: faker.person.lastName() // Generate a fake last name
    }, 
    // Getting mulitple structure for the page
    {
        key: 1,
        image: faker.internet.avatar(),
        name: faker.company.name(),
        description: faker.commerce.productDescription(),
        ratings: faker.helpers.rangeToNumber({ min: 1, max: 5 }),
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName()
    },
    {
        key: 2,
        image: faker.internet.avatar(),
        name: faker.company.name(),
        description: faker.commerce.productDescription(),
        ratings: faker.helpers.rangeToNumber({ min: 1, max: 5 }),
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName()
    },
    {
        key: 3,
        image: faker.internet.avatar(),
        name: faker.company.name(),
        description: faker.commerce.productDescription(),
        ratings: faker.helpers.rangeToNumber({ min: 1, max: 5 }),
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName()
    },
    {
        key: 4,
        image: faker.internet.avatar(),
        name: faker.company.name(),
        description: faker.commerce.productDescription(),
        ratings: faker.helpers.rangeToNumber({ min: 1, max: 5 }),
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName()
    },
    {
        key: 5,
        image: faker.internet.avatar(),
        name: faker.company.name(),
        description: faker.commerce.productDescription(),
        ratings: faker.helpers.rangeToNumber({ min: 1, max: 5 }),
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName()
    },
    {
        key: 6,
        image: faker.internet.avatar(),
        name: faker.company.name(),
        description: faker.commerce.productDescription(),
        ratings: faker.helpers.rangeToNumber({ min: 1, max: 5 }),
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName()
    },
    {
        key: 7,
        image: faker.internet.avatar(),
        name: faker.company.name(),
        description: faker.commerce.productDescription(),
        ratings: faker.helpers.rangeToNumber({ min: 1, max: 5 }),
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName()
    },
    {
        key: 8,
        image: faker.internet.avatar(),
        name: faker.company.name(),
        description: faker.commerce.productDescription(),
        ratings: faker.helpers.rangeToNumber({ min: 1, max: 5 }),
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName()
    },
    {
        key: 9,
        image: faker.internet.avatar(),
        name: faker.company.name(),
        description: faker.commerce.productDescription(),
        ratings: faker.helpers.rangeToNumber({ min: 1, max: 5 }),
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName()
    },
    {
        key: 10,
        image: faker.internet.avatar(),
        name: faker.company.name(),
        description: faker.commerce.productDescription(),
        ratings: faker.helpers.rangeToNumber({ min: 1, max: 5 }),
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName()
    },
    {
        key: 11,
        image: faker.internet.avatar(),
        name: faker.company.name(),
        description: faker.commerce.productDescription(),
        ratings: faker.helpers.rangeToNumber({ min: 1, max: 5 }),
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName()
    },
]

// Export the array of fake card data as the default export
export default CardData;