const deal = require('./dealWithJson');
const userHeads = ['id', 'name', 'age', 'email'];
const createObj = (data) => {
  const userData = {};
  userHeads.forEach((h) => {
    if (h == 'id') userData[h] = Date.now();
    else userData[h] = data[h];
  });
  return userData;
};
class User {
  // Create User
  static addUser = (argv) => {
    const userData = createObj(argv);
    const data = deal.readJsonData('users.json');
    data.push(userData);
    deal.writeJsonData('users.json', data);
    console.log('the user has been CREATED..');
  };

  // Show All Users
  static showAll = () => {
    const allUsers = deal.readJsonData('users.json');
    if (!allUsers.length) {
      console.log('No users yet');
      return;
    }
    allUsers.forEach((user, index) => {
      console.log(`${index + 1} - ${user.name} - ${user.id} - ${user.email}`);
    });
  };

  // Show Specific User
  static showUser = (argv) => {
    const allUsers = deal.readJsonData('users.json');
    const singleUser = allUsers.find((u) => u.id == argv.id);
    if (!singleUser) console.log('no user with this id');
    else console.log(singleUser);
  };

  // Update Specific User
  static updateUser = (argv) => {
    const data = deal.readJsonData('users.json');
    const index = data.findIndex((user) => user.id == argv.id);

    if (index !== -1) {
      (data[index].name = argv.name),
        (data[index].email = argv.email),
        (data[index].age = argv.age);
    }
    deal.writeJsonData('users.json', data);
    console.log('the user has been UPDATED..');
  };

  // Delete Specific User
  static deleteUser = (argv) => {
    const data = deal.readJsonData('users.json');
    const index = data.findIndex((user) => user.id == argv.id);

    if (index !== -1) {
      data.splice(index, 1);
    }

    deal.writeJsonData('users.json', data);
    console.log('the user has been DELETED..');
  };

  // Delete All Users
  static deleteAll = () => {
    const empty = [];
    deal.writeJsonData('users.json', empty);
    console.log('All data have been DELETED..');
  };
}
module.exports = User;
