/* eslint-disable */
import axios from "axios";
import { ALL_CR, CR_TO_XP } from "../mixins/rules.js"

const baseUrl = "https://www.dnd5eapi.co";

const callDndApi = (verb, endpoint, params = {}) => {
  return axios({
    method: verb,
    url: `${baseUrl}${endpoint}`,
    data: params
  });
};

export const getAllMonsters = () => {
  return new Promise((res, rej) => {
    const monsters = []
    const crArray = []
    ALL_CR.forEach(cr => {
      const promise = new Promise((resolve, reject) => {
        axios({
          method: 'GET',
          url: `${baseUrl}/api/monsters/`,
          params: {challenge_rating: cr}
        })
        .then(res => {
          res.data.results.forEach(monster => {
            monster.challenge_rating = cr
            monster.xp = CR_TO_XP[cr]
            monsters.push(monster) 
          })
          resolve();
        })
        .catch(err => reject(err))
      }) 
      crArray.push(promise)
    });
    Promise.all(crArray)
    .then(() => {
      res(monsters)
    })
  })
};

export const getMonstersByCr = cr => {
  return new Promise(() => {
    const params = {
      challenge_rating: cr
    };
    return callDndApi("get", "api/monsters/", params);
  });
};

export const getAllMonstersByCr = () => {
  
  callDndApi("get", "monsters")
}

export const getMonster = monsterUrl => {
  return new Promise((resolve, reject) => {
    resolve(callDndApi("get", monsterUrl))
  })
};
