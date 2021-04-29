import axios from 'axios';

function getNameList(value) {
  return axios.get(
    `https://swapi.dev/api/people/?search=${value}`,
  );
}

export default {
  getList: getNameList
};
