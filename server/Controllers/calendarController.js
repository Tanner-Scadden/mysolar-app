const moment = require('moment');

module.exports = {

  getEvents: async (req, res) => {
    const db = req.app.get('db');
    const { id } = req.query;

    let events = await db.query('select event_id as id, event_name as title, event_start as start, event_end as end, event_type as type from Event WHERE employee_id = $1', [id]);
    
    res.status(200).send(events);

  },


  addEvent: async (req, res) => {
    const db = req.app.get('db');
  },


  alterTime: async (req, res) => {
    const db = req.app.get('db');
    const { event, id } = req.body;

    await db.query('update event SET event_start = $1, event_end = $2 WHERE event_id = $3', [event.start, event.end, event.id])

    let events = await db.query('select event_id as id, event_name as title, event_start as start, event_end as end, event_type as type from Event WHERE employee_id = $1', [id]);

    res.status(200).send(events);
  }

};