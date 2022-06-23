import fetch from "node-fetch";
const url = "https://rooftop-career-switch.herokuapp.com";
const email = "josueroque@yahoo.com";
const orderedArray = [];
let token: { token: string };
let stringsArray: string[];

getToken(url, email)
  .then(async (resp: any) => {
    token = await resp.json();
    stringsArray = await getArray(token.token);
  })
  .catch((error) => {
    throw new Error(error);
  });

function check(blocks: Array<string>, token: string): Array<string> {
  return [""];
}

async function getToken(url: string, email: string): Promise<any> {
  const response = await fetch(`${url}/token?email=${email}`);
  return response;
}

const getArray = async (token: string): Promise<any> => {
  try {
    const response = await fetch(`${url}/blocks?token=${token}`);
    const blocks: { data: Array<string>; chunkSize: number; length: number } =
      await response.json();
    return blocks.data;
  } catch (error) {
    throw new Error(error);
  }
};
