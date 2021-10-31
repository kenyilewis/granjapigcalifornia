const config = {
  uri: 'mongodb://localhost:27017/california',
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
  codes: {
    serverError: 500,
    badRequest: 400,
    success: 200,
  },
};

const tokenConfig = {
  privateKey: process.env.SECRET || 'secretTest',
  ttl: process.env.TTL,
};

// mongodb+srv://testUser:testUsertestUser@clustertest.ebbil.mongodb.net/ClusterTest?retryWrites=true&w=majority

module.exports = { config, tokenConfig };
