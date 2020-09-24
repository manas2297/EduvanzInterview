const Participants = require('../models/Participants');

const ParticipantController = () => {
  const register = async (req, res) => {
    const { body } = req;

    if (!body.name || !body.profession || !body.dob) {
      return res.status(400).json({ error: 'Fields Missing' });
    }
    if (body.no_of_guest > 2) {
      return res.status(400).json({ error: true, msg: 'Wrong Data' });
    }
    try {
      console.log(body);
      const participants = await Participants.create({
        name: body.name,
        age: body.age,
        dob: body.dob,
        profession: body.profession,
        locality: body.locality,
        no_of_guest: body.no_of_guest,
        address: body.address,
      });
      return res.status(200).json({ msg: 'Success', participants })
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: 'Internal Server Error' });
    }
  };
  const getAll = (req, res) => {
    return res.status(200).json({ msg: 'Hello' });
  };
  return {
    getAll,
    register,
  };
};

module.exports = ParticipantController;
