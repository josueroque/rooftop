import fetch from "node-fetch";
const url = "https://rooftop-career-switch.herokuapp.com";
const email = "josueroque@yahoo.com";
let token: { token: string };
let stringsArray: string[];

getToken(url, email)
  .then(async (resp: any) => {
    token = await resp.json();
    stringsArray = await getArray(token.token);
    const sortedArray = check(stringsArray, token.token);
    return sortedArray;
  })
  .catch((error) => {
    throw new Error(error);
  });

const check = (blocks: Array<string>, token: string) => {
  iterate(blocks, token).then((response) => {
    console.log(blocks);
    console.log(response);
    return response;
  });
};

async function getToken(url: string, email: string): Promise<any> {
  const response = await fetch(`${url}/token?email=${email}`);
  return response;
}

const getArray = async (token: string): Promise<Array<string>> => {
  try {
    const response = await fetch(`${url}/blocks?token=${token}`);
    const blocks: { data: Array<string>; chunkSize: number; length: number } =
      await response.json();
    return blocks.data;
  } catch (error) {
    throw new Error(error);
  }
};

const compare = async (
  string1: string,
  string2: string,
  token: string
): Promise<any> => {
  const response = await fetch(`${url}/check?token=${token}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    responseType: "json",
    body: JSON.stringify({
      blocks: [string1, string2],
    }),
  });
  const compareResponse = await response.json();
  return compareResponse.message;
};

const iterate = async (blocks: Array<string>, token: string) => {
  const sortedArray = [...blocks];
  const length: number = sortedArray.length;
  for (let item = 0; item < length - 1; item++) {
    for (let innerItem = item; innerItem < length; innerItem++) {
      9;
      let sequencial: boolean = false;
      if (item !== innerItem) {
        const response = await compare(
          sortedArray[item],
          sortedArray[innerItem],
          token
        );
        if (response) {
          sequencial = true;
          const inmediate = sortedArray[item + 1];
          const newInmediate = sortedArray[innerItem];
          sortedArray[item + 1] = newInmediate;
          sortedArray[innerItem] = inmediate;
        }
      }
      if (item === length - 2 && innerItem === length - 1) {
        return sortedArray;
      }
    }
  }
};
