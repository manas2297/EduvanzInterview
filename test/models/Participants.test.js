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

test('User is created correctly', async () => {
  // check if user is created
  expect(participant.name).toBe('manas');
  expect(participant.age).toBe(23);
  // check if password is not send to browser
  // expect(sendUser.password).toBeFalsy();

  await participant.destroy();
});

// test('User is updated correctly', async () => {
//   await user.update({
//     email: 'peter@mail.com',
//   });

//   expect(user.email).toBe('peter@mail.com');

//   await user.destroy();
// });
