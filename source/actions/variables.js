import {CHANGE_VARIABLE} from './type';
export const change_variable = (key, value) => {
  return {
    type: CHANGE_VARIABLE,
    payload: {key, value},
  };
};

export const production_flag = false;
export const base_url = 'https://api.runiv.in/';
export const version = 'v1';
