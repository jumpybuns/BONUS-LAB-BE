const pool = require('../utils/pool');

module.exports = class Receiver {
  id;
  manufacturer;
  model;
  country;
  year;

  constructor(row) {
    this.id = row.id;
    this.manufacturer = row.manufacturer;
    this.model = row.model;
    this.country = row.country;
    this.year = row.year;
  }

  static async insert({ manufacturer, model, country, year }) {
    const {
      rows,
    } = await pool.query(
      'INSERT INTO receivers (manufacturer, model, country, year) VALUES ($1, $2, $3, $4) RETURNING *',
      [manufacturer, model, country, year]
    );
    return new Receiver(rows[0]);
  }

  static async find() {
    const { rows } = await pool.query('SELECT * FROM receivers');
    return rows.map((row) => new Receiver(row));
  }

  static async findById(id) {
    const { rows } = await pool.query('SELECT * FROM receivers WHERE id=$1', [id]
    );
    if(!rows[0]) throw new Receiver(`${id} not found`);
    return new Receiver(rows[0]);
  }

  static async update({ manufacturer, model, country, year }) {
    const { rows } = await pool.query(
      `
    UPDATE receivers
    SET manufacturer = $1,
    model = $2,
    country = $3,
    year = $4
    WHERE id =$5
    RETURNING *
    `,
      [manufacturer, model, country, year]
    );

    return new Receiver(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query('DELETE FROM receivers WHERE id=$1 RETURNING *', [id]);

    return new Receiver(rows[0]);
  }
};
