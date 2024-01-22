import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin User',
    email: 'admin@email.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
    isManager: false,
  },
  {
    name: 'John Doe',
    email: 'johndoe@email.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: false,
    isManager: false,
  },
  {
    name: 'Jane Doe',
    email: 'janedoe@email.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: false,
    isManager: false,
  },
  {
    name: 'Stocks Admin',
    email: 'stocksAdmin@email.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: false,
    isManager: true,
  },
];

export default users;
