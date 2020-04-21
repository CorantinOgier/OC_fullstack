const bcrypt = require('bcrypt');

const User = require('../models/User');

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10) // méthode asynchrone
      .then(hash => {
        const user = new User({
          email: req.body.email,
          password: hash
        });
        user.save()
          .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
          .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email }) // fonction asynchrone // trouver un utilisateur
      .then(user => {
        if (!user) {
          return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        bcrypt.compare(req.body.password, user.password) // comparer mdp et hash
          .then(valid => {
            if (!valid) {
              return res.status(401).json({ error: 'Mot de passe incorrect !' }); // user trouvé mais comparaison renvoie false
            }
            res.status(200).json({
              userId: user._id,
              token: 'TOKEN' // on verra pour générer un token crypter plus tard
            });
          })
          .catch(error => res.status(500).json({ error })); 
      })
      .catch(error => res.status(500).json({ error })); // problème de connexion, problème liée à MongoDB, etc
  };