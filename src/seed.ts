const mongoose = require('mongoose');

//Nem találtam működő fakert

const fixedBooks = [
  {
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    description: 'A novel about the American dream.',
    pages: 180,
  },
  {
    title: '1984',
    author: 'George Orwell',
    description:
      'A dystopian social science fiction novel and cautionary tale.',
    pages: 328,
  },
  {
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    description: 'A novel about racial injustice in the Deep South.',
    pages: 281,
  },
  {
    title: 'Moby-Dick',
    author: 'Herman Melville',
    description: 'The narrative of Captain Ahab’s obsessive quest.',
    pages: 635,
  },
  {
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    description: 'A romantic novel of manners.',
    pages: 279,
  },
];

const fixedUser = {
  email: 'exampleuser@example.com',
  password: 'securepassword',
  username: 'exampleuser',
};

const seedDatabase = async (connection) => {
  await connection.collection('users').insertOne(fixedUser);

  await connection.collection('books').insertMany(fixedBooks);

  console.log('Database seeded successfully');
};

const connectToDb = async () => {
  try {
    const connection = await mongoose.connect(
      'mongodb://localhost:27017/unic-be-nestjs',
    );
    console.log('Database connected successfully');
    return connection;
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

const run = async () => {
  const connection = await connectToDb();
  await seedDatabase(connection.connection);
};

run().catch((err) => {
  console.error('Error seeding database:', err);
  process.exit(1);
});
