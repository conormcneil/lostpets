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
            image: 'examplehosting.com/andrew.jpg',
            first_name: 'andrew',
            last_name: 'west',
            phone_number: 15202751232,
            isAdmin: true
        }),
        knex('users').insert({
            id: 2,
            username: 'lizzie',
            password: 'lizzie',
            email: 'lizziebee422@gmail.com',
            image: 'examplehosting.com/lizzie.jpg',
            first_name: 'lizzie',
            last_name: 'szoke',
            phone_number: 15202751232,
            isAdmin: true
        }),
        knex('users').insert({
            id: 3,
            username: 'conor',
            password: 'conor',
            email: 'cmkingston21@gmail.com',
            image: 'examplehosting.com/conor.jpg',
            first_name: 'conor',
            last_name: 'kingston',
            phone_number: 15202751232,
            isAdmin: true
        })
    );
};
