const userRepository = require('../repositories/userRepository')
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken')
require('dotenv').config();

const logIn = async (req, res) => {
    try {
        const user = await userRepository.getUserByEmail(req.body.mail);
        let isCorrectPassword = false;

        if (user) {
            isCorrectPassword = await bcrypt.compare(req.body.pass, user.pass);
        }

        if (user && isCorrectPassword) {
            const token = JWT.sign({ id: user._id.toString(), mail: user.mail }, process.env.JWT_SECRET);
            res.status(200).json({ message: 'Iniciando sesión...', token: token })
        } else {
            res.status(404).json({ message: 'Credenciales incorrectas' })
        }
    } catch (err) {
        res.status(500).json({ error: 'Error interno al iniciar sesión' })
    }
}

const createUser = async (req, res) => {
    try {
        const pass_hash = await bcrypt.hash(req.body.pass, 10);
        const user_hash_pass = { ...req.body, pass: pass_hash }
        await userRepository.createUser(user_hash_pass);
        res.status(200).json({ message: 'Usuario registrado con éxito' });
    } catch (err) {
        res.status(500).json({ message: 'Error interno en el registro' });
    }
}

module.exports = { logIn, createUser }