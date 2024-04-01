import Role from "../models/role.js"

export const index = (req, res) => {
    Role.find({}).then((roles) => {
        res.status(200).json({roles});
    }).catch((error) => {
            res.status(500).json({error})
        })
}


export const create = (req, res) => {
  Role.create({
    name: req.body.name,
  })
    .then((role) => {
      res.status(200).json({ role });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};