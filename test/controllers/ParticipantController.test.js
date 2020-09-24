const request = require('supertest');
const {
  beforeAction,
  afterAction,
} = require('../setup/_setup');
const Participants = require('../../api/models/Participants');

let api;

beforeAll(async () => {
  api = await beforeAction();
});

afterAll(() => {
  afterAction();
});

test('Participants | register', async () => {
  const res = await request(api)
    .post('/api/participants')
    .set('Accept', /json/)
    .send({
      name: 'manas',
      age: 23,
      dob: '1997-05-28',
      profession: 'Student',
      locality: 'Bengaluru',
      no_of_guest: 2,
      address: 'kormangla, India',
    })
    .expect(200);

  expect(res.body.participants.name).toBeTruthy();

  const participant = await Participants.findByPk(res.body.participants.id);
  expect(participant.id).toBe(res.body.participants.id);
  expect(participant.name).toBe(res.body.participants.name);
  expect(participant.age).toBe(res.body.participants.age);
  expect(participant.dob).toBe(res.body.participants.dob);
  expect(participant.profession).toBe(res.body.participants.profession);
  expect(participant.no_of_guest).toBe(res.body.participants.no_of_guest);
  expect(participant.address).toBe(res.body.participants.address);
  expect(participant.locality).toBe(res.body.participants.locality);
  await participant.destroy();
});

test('Participants | register', async () => {
  const res = await request(api)
    .post('/api/participants')
    .set('Accept', /json/)
    .send({
      age: 23,
      dob: '1997-05-28',
      profession: 'test',
      locality: 'Bengaluru',
      no_of_guest: 2,
      address: 'kormangla, India',
    })
    .expect(400);
  expect(res.body.error).toBe('Fields Missing');
});
test('Participants | register', async () => {
  const res = await request(api)
    .post('/api/participants')
    .set('Accept', /json/)
    .send({
      name: 'test',
      age: 23,
      dob: '1997-05-28',
      profession: 'test',
      locality: 'Bengaluru',
      no_of_guest: 5,
      address: 'kormangla, India',
    })
    .expect(400);
  expect(res.body.msg).toBe('Wrong Data');
});
test('Participants | register', async () => {
  const addr = 'kormangla';
  const res = await request(api)
    .post('/api/participants')
    .set('Accept', /json/)
    .send({
      name: 'test',
      age: 23,
      dob: '1997-05-28',
      profession: 'test',
      locality: 'Bengaluru',
      no_of_guests: 2,
      address: addr,
    })
    .expect(500);
  const res2 = await request(api)
    .post('/api/participants')
    .set('Accept', /json/)
    .send({
      name: 'test',
      age: 23,
      dob: '1997-05-28',
      profession: 'test',
      locality: 'Bengaluru',
      no_of_guests: 2,
      address: addr.repeat(70),
    })
    .expect(400);
  expect(res.body.msg).toBe('Internal Server Error');
  expect(res2.body.error).toBeTruthy();
});


test('Participants | getAll', async () => {
  const participant = await Participants.create({
    name: 'manas',
    age: 23,
    dob: '1997-05-28',
    profession: 'Student',
    locality: 'Bengaluru',
    no_of_guest: 2,
    address: 'kormangla, India',
  });

  const res = await request(api)
    .get('/api/participants?size=2&page=0')
    .set('Accept', /json/)
    .expect(200);
  const res2 = await request(api)
    .get('/api/participants')
    .set('Accept', /json/)
    .expect(200);

  expect(res.body.data).toBeTruthy();
  expect(res.body.data.participants.length).toBe(2);
  expect(res2.body.data).toBeTruthy();
  expect(res2.body.data.participants.length).toBe(10);
  await participant.destroy();
});

test('Participants | update', async () => {
  // const participant = await Participants.update({
    // name: 'manas',
    // age: 23,
    // dob: '1997-05-28',
    // profession: 'Student',
    // locality: 'Bengaluru',
    // no_of_guest: 2,
    // address: 'kormangla, India',
  // }, { where: { id: 1 } });

  const res = await request(api)
    .put('/api/participants/1')
    .set('Accept', /json/)
    .send({
      name: 'manas',
      age: 23,
      dob: '1997-05-28',
      profession: 'Student',
      locality: 'Bengaluru',
      no_of_guest: 2,
      address: 'kormangla, India',
    })
    .expect(200);
  const res2 = await request(api)
    .put('/api/participants/90')
    .set('Accept', /json/)
    .send({
      name: 'manas',
      age: 23,
      dob: '1997-05-28',
      profession: 'Student',
      locality: 'Bengaluru',
      no_of_guest: 2,
      address: 'kormangla, India',
    })
    .expect(400);

  expect(res.body.msg).toBeTruthy();
  expect(res.body.msg).toBe('Successfully Updated');
  expect(res2.body.msg).toBeTruthy();
  expect(res2.body.msg).toBe('Cannot Update! User Not Found.');
});