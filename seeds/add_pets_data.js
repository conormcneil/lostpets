exports.seed = function(knex, Promise) {
    return Promise.join(
        // Deletes ALL existing entries
        knex('pets').del(),

        // Inserts seed entries
        knex('pets').insert({
            name: 'Spot',
            species: 'dog',
            location: '80302',
            age: '3 months',
            description: 'The cutest nearsighted Yellow Lab you ever saw',
            user_id: 1,
            isFound: false,
            date: '2016-05-25',
            image: 'https://res.cloudinary.com/dmuipy77o/image/upload/v1465920528/spot_test.jpg',
            contact: '5202751232'
        }),
        knex('pets').insert({
            name: 'Fido',
            species: 'dog',
            location: '80304',
            age: '7 months',
            description: 'Small, gold Yorkie with cape, allergic to kryptonite',
            user_id: 2,
            isFound: false,
            date: '2016-03-12',
            image: 'http://res.cloudinary.com/dmuipy77o/image/upload/v1465920528/fido_test.jpg',
            contact: '5202751232'
        }),
        knex('pets').insert({
            name: 'Rose',
            species: 'cat',
            location: '80241',
            age: '19 years',
            description: 'Rose is a small black cat with brown stripes and white paws.',
            user_id: 3,
            isFound: true,
            date: '2015-12-30',
            image: 'http://res.cloudinary.com/dmuipy77o/image/upload/v1465920528/rose_test.jpg',
            contact: '5202751232'
        }),
        knex('pets').insert({
            name: 'Hunter',
            species: 'ferrret',
            location: '90210',
            age: '15 years old',
            description: 'I lost Hunter when my neighbor left the garage door open at my house. He doesn\'t really like people so he won\'t be approachable. If you find him, please contact me so that I can come pick him up myself.',
            user_id: 3,
            isFound: false,
            date: '12-30-2015',
            image: 'https://res.cloudinary.com/dmuipy77o/image/upload/v1466017008/i5zrygtp4osydkoaw9wk.jpg',
            contact: '5202751232'
        }),
        knex('pets').insert({
            name: 'Tank',
            species: 'dog',
            location: '85712',
            age: '10 months',
            description: 'blue nose pit, he loves people, kids and chewy toys. he loves bacon and was wearing a brown leather collar with his tags',
            user_id: 2,
            isFound: false,
            date: '2016-03-30',
            image: 'https://res.cloudinary.com/dmuipy77o/image/upload/v1466017454/n5igycm4vt8aspwc4ja4.jpg',
            contact: '5202751232'
        }),
        knex('pets').insert({
            name: 'Spike',
            species: 'cat',
            location: '80231',
            age: '7 years old',
            description: 'He has black spots on his tongue, loves hunting birds, was wearing a blue collar last time I saw him',
            user_id: 1,
            isFound: true,
            date: '2016-06-01',
            image: 'https://res.cloudinary.com/dmuipy77o/image/upload/v1466016668/dhqmu1dy1nagcsosozja.jpg',
            contact: '5202751232'
        })
    );
};
