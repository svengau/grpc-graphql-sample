import check from './Check';

const protoPath = `${__dirname}/Health.proto`;

export default {
  protoPath,
  implementation: {
    check
  }
};
