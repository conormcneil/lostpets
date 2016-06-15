exports.seed = function(knex, Promise) {
    return Promise.join(
        // Deletes ALL existing entries
        knex('pets').del(),

        // Inserts seed entries
        knex('pets').insert({
            name: 'Spot',
            species: 'dog',
            location: 'close to home',
            age: '3 months',
            description: 'The cutest nearsighted Yellow Lab you ever saw',
            user_id: 1,
            isFound: false,
            image: 'https://res.cloudinary.com/dmuipy77o/image/upload/v1465920528/spot_test.jpg',
            contact: 'Contact user/owner'
        }),
        knex('pets').insert({
            name: 'Fido',
            species: 'dog',
            location: '28th & Canyon',
            age: '7 months',
            description: 'Small, gold Yorkie with cape, allergic to kryptonite',
            user_id: 2,
            isFound: false,
            image: 'http://res.cloudinary.com/dmuipy77o/image/upload/v1465920528/fido_test.jpg',
            contact: 'Contact user/owner'
        }),
        knex('pets').insert({
            name: 'Rose',
            species: 'cat',
            location: 'wherever cats live',
            age: '19 years',
            description: 'Rose is a small black cat with brown stripes and white paws.',
            user_id: 3,
            isFound: true,
            image: 'http://res.cloudinary.com/dmuipy77o/image/upload/v1465920528/rose_test.jpg',
            contact: 'Boulder Humane Society'
        })
    );
};
