const publicRoutes = {
  'POST /participants': 'ParticipantController.register',
  'GET /participants': 'ParticipantController.getAll',
  'PUT /participants/:id': 'ParticipantController.update',
};

module.exports = publicRoutes;
