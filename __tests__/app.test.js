const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');
const Receiver = require('../lib/models/Receiver');

describe('app endpoints', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });
  afterAll(() => {
    return pool.end();
  });

  it('POST creates a new receivers', async () => {
    const response = await request(app).post('/api/v1/receivers').send({
      'manufacturer': 'McIntosh',
      'model': 'MC2205',
      'country': 'USA',
      'year': '1970',
    });

    expect(response.body).toEqual({
      'id': '1',
      'manufacturer': 'McIntosh',
      'model': 'MC2205',
      'country': 'USA',
      'year': '1970',
    });
  });

  it('GET to get all receivers', async () => {
    const receivers = await Receiver.insert({
      'manufacturer': 'McIntosh',
      'model': 'MC2205',
      'country': 'USA',
      'year': '1970',
    });

    const response = await request(app).get('/api/v1/receivers');

    expect(response.body).toEqual([receivers]);
  });

  it('FINDS a receivers by id via GET', async () => {
    const receivers = await Receiver.insert({
      'manufacturer': 'McIntosh',
      'model': 'MC2205',
      'country': 'USA',
      'year': '1970',
    });

    const response = await request(app).get(
      `/api/v1/receivers/${receivers.id}`
    );

    expect(response.body).toEqual({
      'id': '1',
      'manufacturer': 'McIntosh',
      'model': 'MC2205',
      'country': 'USA',
      'year': '1970',
    });
  });

  it('UPDATES a receiver by id via PUT', async () => {
    const receivers = await Receiver.insert({
      'manufacturer': 'McIntosh',
      'model': 'MC2205',
      'country': 'USA',
      'year': '1970',
    });

    const response = await request(app)
      .put(`/api/v1/receivers/${receivers.id}`)
      .send({
        'manufacturer': 'McIntosh',
        'model': 'C28',
        'country': 'USA',
        'year': '1975',
      });

    expect(response.body).toEqual({
      'manufacturer': 'McIntosh',
      'model': 'C28',
      'country': 'USA',
      'year': '1975',
    });
  });

  it('DELETE a receivers by id ', async () => {
    const receivers = await Receiver.insert({
      'manufacturer': 'McIntosh',
      'model': 'MC2205',
      'country': 'USA',
      'year': '1975',
    });

    const response = await request(app).delete(
      `/api/v1/receivers/${receivers.id}`
    );

    expect(response.body).toEqual(receivers);
  });
});
