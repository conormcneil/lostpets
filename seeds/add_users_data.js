exports.seed = function(knex, Promise) {
    return Promise.join(
        // Deletes ALL existing entries
        knex('users').del(),

        // Inserts seed entries
        knex('users').insert({
            id: 1,
            username: 'andrew',
            password: '$2a$08$Fl.2PwybQk2M1LYOU2emcu74W/oMVapDWvGHLvPlt5DzOEtOvUS3W',
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
            password: '$2a$08$ak.2skitNrOT0C4/e9KP7ufu/ulv83aC7jGhehkAuRcbGz65quGDu',
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
            password: '$2a$08$nz8VnQBycH/ggQhhZFUhJe0rKCETRqroqFsGD/BjxsEWEbGSFxOym',
            email: 'cmkingston21@gmail.com',
            image: 'examplehosting.com/conor.jpg',
            first_name: 'conor',
            last_name: 'kingston',
            phone_number: 15202751232,
            isAdmin: true
        })
    );
};
