console.log("hola");
const url = "https://rooftop-career-switch.herokuapp.com";
const email = "josueroque@yahoo.com";
import fetch from "node-fetch";

const orderedArray = [];
let token: string;
let stringsArray: string[];
console.log("hola");
export const getToken = async (url: string, email: string): Promise<any> => {
  const response = await fetch(`${url}/token?email=${email}`);
  return response;
};

getToken(url, email)
  .then((resp) => {
    token = resp;
    console.log(token);
    return token;
  })
  .catch((error) => {
    console.log(error);
    throw new Error(error);
  });

const check = (blocks: Array<string>, token: string): Array<string> => {
  return ["", " "];
};

const getArray = async (url: string, token: string): Promise<any> => {
  const response = await fetch(`${url}/token?email=${token}`);
  return response;
};

//Desarrollar aquí dentro el algoritmo que ordene los bloques, usando
// la API "/check".
//IMPORTANTE: observar que está recibiendo un parámetro "token". El
// mismo es para usarlo en la llamada a la API.
