const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const randtoken = require('rand-token');
const User = require('../users/user.model');

const jwtHash = process.env.JWT_TOKEN || "BB7C42AB748FCAA7B28DA122F9E4E3916E439226ADF4D007A88A96BB3D3EC4B2";
const refreshTokens = {};


module.exports = {
    authenticate,
    refreshToken,
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function authenticate({ username, password }) {
    if (!(username && password)) {
        return 
    }

    const user = await User.findOne({ username });
    if (user && bcrypt.compareSync(password, user.hash)) {
        const { hash, ...userWithoutHash } = user.toObject();

        const token = jwt.sign({ sub: user.id }, jwtHash, { expiresIn: 30 });
        const refreshToken = randtoken.uid(256);
        refreshTokens[refreshToken] = username;

        return {
            ...userWithoutHash,
            token,
            refreshToken
        };
    }
}

async function refreshToken({username, refreshToken}) {

        if ( !( (refreshToken in refreshTokens) && (refreshTokens[refreshToken] === username) ) ) {
            res.sendStatus(401);
            return;
        }

        const user = { username };
        const token = jwt.sign(user, SECRET, { expiresIn: 300 });

        return {token};
}

async function getAll() {
    return await User.find().select('-hash');
}

async function getById(id) {
    return await User.findById(id).select('-hash');
}

async function create(userParam) {
    // validate
    if (await User.find({ username: userParam.username })) {
        throw 'Username "' + userParam.username + '" is already taken';
    }

    // hash password
    if (userParam.password) {
        userParam.hash = bcrypt.hashSync(userParam.password, 10);
    }

    const user = new User(userParam);

    // save user
    await user.save();
}

async function update(id, userParam) {
    const user = await User.findById(id);

    // validate
    if (!user) throw 'User not found';
    if (user.username !== userParam.username && await User.findOne({ username: userParam.username })) {
        throw 'Username "' + userParam.username + '" is already taken';
    }

    // hash password if it was entered
    if (userParam.password) {
        userParam.hash = bcrypt.hashSync(userParam.password, 10);
    }

    // copy userParam properties to user
    Object.assign(user, userParam);

    await user.save();
}

async function _delete(id) {
    await User.findByIdAndRemove(id);
}