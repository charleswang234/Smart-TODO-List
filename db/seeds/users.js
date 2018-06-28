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
        { 'first_name': 'Alice', 'last_name': 'Smith', 'email':'example@a.com', 'password':'test1'},
        {'first_name': 'Bob', 'last_name': 'Doe', 'email':'example@b.com', 'password':'test2'},
        {'first_name': 'Charlie', 'last_name': 'Brown', 'email':'example@c.com', 'password':'test3'}
      ]).returning('*');
    };

  function insertCategories() {
    return knex('categories').insert([
      {id: 1, 'category': 'Buy'},
      {id: 2, 'category': 'Read'},
      {id: 3, 'category': 'Watch'},
      {id: 4, 'category': 'Eat'}
    ]).returning('*');
  }

  function insertTasks(users, categories) {
    return knex('tasks').insert([
      {id: 1, 'activity': 'Buy apple', 'completed': false, 'user_id': users[0].id, 'category_id': categories[0].id},
      {id: 2, 'activity': 'Read manga', 'completed': false, 'user_id': users[0].id, 'category_id': categories[1].id},
      {id: 3, 'activity': 'Read book', 'completed': false, 'user_id': users[1].id, 'category_id': categories[1].id},
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
