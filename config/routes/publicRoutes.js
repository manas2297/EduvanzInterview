const publicRoutes = {
  'POST /participants': 'ParticipantController.register',
  'GET /participants': 'ParticipantController.getAll',
};

module.exports = publicRoutes;
