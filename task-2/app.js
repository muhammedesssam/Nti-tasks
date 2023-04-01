const yargs = require('yargs');
const user = require('./modules/users');

// Create User
yargs.command({
  command: 'addUser',
  builder: {
    name: { demandOption: true },
    age: { demandOption: true },
    email: { demandOption: true },
  },
  handler: (argv) => {
    user.addUser(argv);
  },
});

// Show All Users
yargs.command({
  command: 'showAll',
  handler: () => user.showAll(),
});

// Show Specific User
yargs.command({
  command: 'showUser',
  builder: { id: { demandOption: true } },
  handler: (argv) => user.showUser(argv),
});

// Update Specific User
yargs.command({
  command: 'updateUser',
  builder: { id: { demandOption: true } },
  handler: (argv) => user.updateUser(argv),
});

// Delete Specific User
yargs.command({
  command: 'deleteUser',
  builder: { id: { demandOption: true } },
  handler: (argv) => user.deleteUser(argv),
});

// Delete All Users
yargs.command({
  command: 'deleteAll',
  handler: (argv) => user.deleteAll(argv),
});

yargs.argv;
