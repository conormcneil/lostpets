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
        }),
        knex('pets').insert({
            name: 'Walker',
            species: 'dog',
            location: '84930',
            age: '24 weeks',
            description: 'Brown and black spots and white coat, Walker has been a wonderful addition to our family and we are missing him dearly. Please help us find him!',
            user_id: 1,
            isFound: false,
            date: '2016-04-11',
            image: 'https://res.cloudinary.com/dmuipy77o/image/upload/v1466182290/walker_yvhebx.jpg',
            contact: '5202751232'
        }),
        knex('pets').insert({
            name: 'Venus',
            species: 'cat',
            location: '85641',
            age: '3-5 years',
            description: 'I found Venus near the grocery store last night. He has a black and brown face and is very friendly.',
            user_id: 2,
            isFound: true,
            date: '2016-02-24',
            image: 'https://res.cloudinary.com/dmuipy77o/image/upload/v1466182290/venus_skeech.jpg',
            contact: '5202751232'
        }),
        knex('pets').insert({
            name: 'Tabby',
            species: 'cat',
            location: '80457',
            age: '8 years',
            description: 'Tabby has been my best friend for years, she loves playing with toys but is very independent. Please notify me if you see her!',
            user_id: 3,
            isFound: false,
            date: '2016-03-15',
            image: 'https://res.cloudinary.com/dmuipy77o/image/upload/v1466182290/tabby_agyzvk.jpg',
            contact: '5202751232'
        }),
        knex('pets').insert({
            name: 'Mustache',
            species: 'cat',
            location: '80432',
            age: 'about 2 years',
            description: 'I found this handsome cat sitting casually outside the local speakeasy. He\'s very laid back and seems to enjoy a good scotch each night before bed. I\'m sure someone is missing him!',
            user_id: 2,
            isFound: true,
            date: '2016-06-15',
            image: 'https://res.cloudinary.com/dmuipy77o/image/upload/v1466182290/mustache_chk7xp.jpg',
            contact: '5202751232'
        }),
        knex('pets').insert({
            name: 'Frank',
            species: 'cat',
            location: '80241',
            age: '6',
            description: 'I lost Frank on Valentine\'s Day and it broke my heart; he usually comes home after a few days but I haven\'t seen him at all. I suspect he is in the neighborhood somewhere and I would really appreciate anyone\'s help in finding him.',
            user_id: 1,
            isFound: false,
            date: '2016-02-14',
            image: 'http://res.cloudinary.com/dmuipy77o/image/upload/v1466182290/frank_vedqja.jpg',
            contact: '5202751232'
        }),
        knex('pets').insert({
            name: 'Bear',
            species: 'dog',
            location: '84301',
            age: '3',
            description: 'Found Bear wearing his tags but no phone number; I can keep him for a few weeks before I have to take him to a shelter.',
            user_id: 1,
            isFound: true,
            date: '2016-05-14',
            image: 'http://res.cloudinary.com/dmuipy77o/image/upload/v1466182290/bear_e10yiv.jpg',
            contact: '5202751232'
        }),
        knex('pets').insert({
            name: 'Batman',
            species: 'dog',
            location: '84301',
            age: '1 year',
            description: 'Batman often leaves in the night, I\'m not really sure where he goes or what he does but he\'s always come home... He will also respond to Fritz and sausages.',
            user_id: 2,
            isFound: false,
            date: '2016-05-10',
            image: 'http://res.cloudinary.com/dmuipy77o/image/upload/v1466182290/batman_eye6de.jpg',
            contact: '5202751232'
        }),
        knex('pets').insert({
            name: 'Butters',
            species: 'rabbit',
            location: '84402',
            age: '7 years',
            description: 'I found a huge rabbit in my front yard that looks like it belongs to someone. Something about it just seems.... different?',
            user_id: 2,
            isFound: true,
            date: '2016-05-11',
            image: 'https://res.cloudinary.com/dmuipy77o/image/upload/v1466187879/butters_hdxueu.jpg',
            contact: '5202751232'
        })
    );
};
