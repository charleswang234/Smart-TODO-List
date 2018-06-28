exports.seed = function(knex, Promise) {
  function deleteTasks() {
    return knex('tasks').del()
  }
  function deleteCategories() {
    return knex('categories').del()
  }
  function deleteUsers() {
    return knex('users').del()
  }
  function insertUsers(){
    return knex('users').insert([
        {'first_name': 'Alice', 'last_name': 'Smith', 'email':'a@a.ca', 'password':'$2a$10$F43Et0KFHaNNbhHnkHKSP.Ddp4d.vh9JF5q7JlI//UxSA84nnjMgq'},
        {'first_name': 'Bob', 'last_name': 'Doe', 'email':'b@b.ca', 'password':'$2a$10$F43Et0KFHaNNbhHnkHKSP.Ddp4d.vh9JF5q7JlI//UxSA84nnjMgq'},
        {'first_name': 'Charlie', 'last_name': 'Brown', 'email':'c@c.ca', 'password':'$2a$10$F43Et0KFHaNNbhHnkHKSP.Ddp4d.vh9JF5q7JlI//UxSA84nnjMgq'}
      ]).returning('*');
    };
  function insertCategories() {
    return knex('categories').insert([
      {'category': 'Buy'},
      {'category': 'Read'},
      {'category': 'Watch'},
      {'category': 'Eat'}
    ]).returning('*');
  }
  function insertTasks(users, categories) {
    return knex('tasks').insert([
      {'activity': 'Buy apple', 'completed': false, 'user_id': users[0].id, 'category_id': categories[0].id},
      {'activity': 'Read manga', 'completed': false, 'user_id': users[0].id, 'category_id': categories[1].id},
      {'activity': 'Read book', 'completed': false, 'user_id': users[1].id, 'category_id': categories[1].id},
    ]);
  }
  return deleteTasks()
    .then(deleteCategories)
    .then(deleteUsers)
    .then(insertUsers)
    .then(users => {
      return insertCategories().then(categories => {
        return insertTasks(users, categories);
      })
    })
    // .then(insertCategories)
    // .then((users, categories) => {
    //   insertTasks(users, categories);
    // })
};
