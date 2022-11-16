const mongoose = require('mongoose');
const { Schema } = mongoose;
//or const Schema= mongoose.schema;

mongoose.connect('mongodb://localhost:27017/relationshipDemo')
    .then(() => {
        console.log('Mongo connection open!');
    })
    .catch(err => {
        console.log('Mongo connection error!');
        console.log(err);
    })

const userSchema = new Schema({
    username: String,
    age: Number
})

const tweetSchema = new Schema({
    text: String,
    likes: Number,
    user: { type: Schema.Types.ObjectId, ref: 'User' }
})

const User = mongoose.model('User', userSchema);
const Tweet = mongoose.model('Tweet', tweetSchema);

// const makeTweets = async () => {
//     // const user = new User({ username: 'chickenfan99', age: 61 });
//     const user = await User.findOne({ username: 'chickenfan99' })
//     const tweet2 = new Tweet({ text: 'bock bock bock chicken noises', likes: 1278 });
//     tweet2.user = user;
//     // user.save();
//     tweet2.save();
// }

// makeTweets();

const findTweet = async () => {
    //populates user but only the username field
    const t = await Tweet.findOne({}).populate('user', 'username')
    console.log(t);
}

findTweet();