import fetch from "node-fetch";
const url = "https://rooftop-career-switch.herokuapp.com";
const email = "josueroque@yahoo.com";
let token: { token: string };
let stringsArray: string[];
let startTime: any;

getToken(url, email)
  .then(async (resp: any) => {
    token = await resp?.json();
    console.log("Token fetched succesfully");
    stringsArray = await getArray(token?.token);
    console.log("Array fetched succesfully");
    console.log("Starting to check, please wait...");
    startTime = new Date().getTime();
    const sortedArray = await check(stringsArray, token?.token);
    console.log("Sorted string:");
    console.log(sortedArray?.join(""));
    console.log("Sorted array:");
    console.log(sortedArray);
  })
  .catch((error) => {
    throw new Error(error);
  });

export const check = async (blocks: Array<string>, token: string) => {
  const returnedArray = await iterate(blocks, token);
  const endTime = new Date().getTime();
  console.log(`Finished, time taken=> ${(endTime - startTime) / 1000} seconds`);
  return returnedArray;
};

async function getToken(url: string, email: string): Promise<any> {
  const response = await fetch(`${url}/token?email=${email}`);
  return response;
}

const getArray = async (token: string): Promise<Array<string>> => {
  try {
    const response = await fetch(`${url}/blocks?token=${token}`);
    const blocks: { data: Array<string>; chunkSize: number; length: number } =
      await response?.json();
    return blocks?.data;
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
  const compareResponse = await response?.json();
  return compareResponse.message;
};

const iterate = async (blocks: Array<string>, token: string) => {
  try {
    const sortedArray = Array.isArray(blocks) ? [...blocks] : [];
    const length: number = sortedArray.length;
    for (let item = 0; item < length - 1; item++) {
      for (let innerItem = item; innerItem < length; innerItem++) {
        let sequential: boolean = false;
        if (item !== innerItem) {
          const response = await compare(
            sortedArray[item],
            sortedArray[innerItem],
            token
          );
          if (response) {
            sequential = true;
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
  } catch (error) {
    throw new Error(error);
  }
};
