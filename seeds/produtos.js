/**  npx knex seed:make produtos
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('produtos').del()
  await knex('produtos').insert([
    {id: 1, descricao: 'Cream Craker', marca: "Aymmoré", valor : 3.5},
    {id: 2, descricao: 'Cerveja', marca: "Spaten", valor : 10.99},
    {id: 3, descricao: 'Filé Mignon', marca: "Friboi", valor : 78.6},
    {id: 4, descricao: 'Refrigerante', marca: "Pepsi-Cola", valor : 7.5},    
  ]);
};
