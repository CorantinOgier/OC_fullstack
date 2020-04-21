const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {                                                     // plusieurs éléments peuvent poser problème, on veut pouvoir les gérer dans ce bloc catch
    const token = req.headers.authorization.split(' ')[1]; // split tableau avec bearer en premier élement et le token en deuxième
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET'); // une fois décodé ce sera un objet JS classique, on pourra récupérer le user_id
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      throw 'User ID non valable'; // renvoyer l'erreur
    } else {
      next();
    }
  } catch (error) {
    res.status(401).json({error: error | 'Requête non authentifiée !'});
  }
};