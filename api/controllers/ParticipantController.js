const Participants = require('../models/Participants');
const { getPagination, getPagingData } = require('../utils/utils');

const ParticipantController = () => {
  const register = async (req, res) => {
    const { body } = req;

    if (!body.name || !body.profession || !body.dob) {
      return res.status(400).json({ error: 'Fields Missing' });
    }
    if (body.no_of_guest && body.no_of_guest > 2) {
      return res.status(400).json({ error: true, msg: 'Wrong Data' });
    }
    if (body.address.length > 50) {
      return res.status(400).json({ error: true, msg: 'Address to be less than 50 chars' });
    }
    try {
      const participants = await Participants.create({
        name: body.name,
        age: body.age,
        dob: body.dob,
        profession: body.profession,
        locality: body.locality,
        no_of_guest: body.no_of_guest,
        address: body.address,
      });
      return res.status(200).json({ msg: 'Success', participants });
    } catch (err) {
      return res.status(500).json({ msg: 'Internal Server Error' });
    }
  };
  const getAll = async (req, res) => {
    const { page, size } = req.query;
    const { limit, offset } = getPagination(page, size);
    try {
      const response = await Participants.findAndCountAll({ limit, offset });
      const participants = getPagingData(response, page, limit);
      return res.status(200).json({ data: participants });
    } catch (error) {
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };
  const update = async (req, res) => {
    const { id } = req.params;
    try {
      const response = await Participants.update(req.body, {
        where: { id },
      });
      if (response[0] === 1) {
        return res.status(200).json({ msg: 'Successfully Updated' });
      }
      return res.status(400).json({ msg: 'Cannot Update! User Not Found.' });
    } catch (error) {
      return res.status(500).json({ msg: 'Internal Server error' });
    }
  };
  return {
    getAll,
    register,
    update,
  };
};

module.exports = ParticipantController;
