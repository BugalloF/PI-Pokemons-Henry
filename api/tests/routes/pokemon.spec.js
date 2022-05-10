/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Pokemon, conn } = require('../../src/db.js');

const agent = session(app);
const pokemon = {
  name: 'Pikachu',
  hp: 35,
  attack: 55,
  defense: 40,
  speed: 90,
  height: 4,
  weight: 60
};

describe('Pokemon routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Pokemon.sync({ force: true })
    .then(() => Pokemon.create(pokemon)));

  describe('GET /pokemons', () => {
    it('Should get status 200', () => {
      agent.get('/pokemons')
      .expect(200)
      .expect('Content-Type', /json/)
    })
  });
  describe('GET /types', () => {
    it('Should get status 200', () => {
      agent.get('/types')
      .expect(200)
      .expect('Content-Type', /json/)
    })
  });
  describe('POST/ pokemons', () => {
    it('Should post a pokemon with status 200', () => {
      agent.post('/pokemons')
      .send(pokemon)
      .expect(200)
      .expect('Content-Type', /json/)
    })
  });
});
