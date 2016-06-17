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
            first_name: 'Andrew',
            last_name: 'West',
            phone_number: 15202751232,
            isAdmin: true
        }),
        knex('users').insert({
            id: 2,
            username: 'lizzie',
            password: '$2a$08$ak.2skitNrOT0C4/e9KP7ufu/ulv83aC7jGhehkAuRcbGz65quGDu',
            email: 'lizziebee422@gmail.com',
            first_name: 'Lizzie',
            last_name: 'Szoke',
            phone_number: 15202751232,
            isAdmin: true
        }),
        knex('users').insert({
            id: 3,
            username: 'Conor',
            password: '$2a$08$nz8VnQBycH/ggQhhZFUhJe0rKCETRqroqFsGD/BjxsEWEbGSFxOym',
            email: 'cmkingston21@gmail.com',
            first_name: 'Conor',
            last_name: 'Kingston',
            phone_number: 15202751232,
            isAdmin: true
        })
    );
};
