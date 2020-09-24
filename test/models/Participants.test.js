const {
  beforeAction,
  afterAction,
} = require('../setup/_setup');
const Participants = require('../../api/models/Participants');

let participant;

beforeAll(async () => {
  await beforeAction();
});

afterAll(() => {
  afterAction();
});

beforeEach(async () => {
  participant = await Participants.create({
    name: 'manas',
    age: 23,
    dob: '1997-05-28',
    profession: 'Student',
    locality: 'Bengaluru',
    no_of_guests: 2,
    address: 'kormangla, India',
  });
});

test('Participant is created correctly', async () => {
  expect(participant.name).toBe('manas');
  expect(participant.age).toBe(23);

  await participant.destroy();
});
