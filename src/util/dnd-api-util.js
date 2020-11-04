import axios from "axios";

const baseUrl = "https://www.dnd5eapi.co/api/";

const callDndApi = (verb, endpoint, params = {}) => {
  return axios({
    method: verb,
    url: `${baseUrl}${endpoint}`,
    data: params
  });
};

export const getAllMonsters = () => {
  return callDndApi("get", "monsters");
};

export const getMonstersByCr = cr => {
  const params = {
    challenge_rating: cr
  };
  return callDndApi("get", "monsters", params);
};

export const getMonster = monsterUrl => {
  return callDndApi("get", monsterUrl);
};
