exports.seed = function(knex, Promise) {
    return Promise.join(
        // Deletes ALL existing entries
        knex('users').del(),

        // Inserts seed entries
        knex('users').insert({
            id: 1,
            username: 'andrew',
            password: 'andrew',
            email: 'andrew@andrew.com',
            image: 'examplehosting.com/andrew.jpg'
        }),
        knex('users').insert({
            id: 2,
            username: 'lizzie',
            password: 'lizzie',
            email: 'lizzie@lizzie.com',
            image: 'examplehosting.com/lizzie.jpg'
        }),
        knex('users').insert({
            id: 3,
            username: 'conor',
            password: 'conor',
            email: 'conor@conor.com',
            image: 'examplehosting.com/conor.jpg'
        })
    );
};
