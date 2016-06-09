exports.seed = function(knex, Promise) {
    return Promise.join(
        // Deletes ALL existing entries
        knex('pets').del(),

        // Inserts seed entries
        knex('pets').insert({
            id: 1,
            name: 'spot',
            species: 'dog',
            location: 'close to home',
            age: 3,
            description: 'The cutest Black Lab you ever saw',
            user_id: 1,
            isFound: false,
            image: 'examplehosting.com/spot.jpg',
            contact: 'Contact user/owner'
        }),
        knex('pets').insert({
            id: 2,
            name: 'fido',
            species: 'dog',
            location: '28th & Canyon',
            age: 7,
            description: 'Small white Yorkie with pink collar',
            user_id: 2,
            isFound: false,
            image: 'examplehosting.com/fido.jpg',
            contact: 'Contact user/owner'
        }),
        knex('pets').insert({
            id: 3,
            name: 'rose',
            species: 'cat',
            location: 'wherever cats live',
            age: 19,
            description: 'Rose is a small black cat with brown spots and white paws.',
            user_id: 3,
            isFound: true,
            image: 'examplehosting.com/rose.jpg',
            contact: 'Boulder Humane Society'
        })
    );
};
