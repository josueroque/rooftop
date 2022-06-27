import fetch from "node-fetch";
const url = "https://rooftop-career-switch.herokuapp.com";
const email = "josueroque@yahoo.com";
let token: { token: string };
let stringsArray: string[];
let startTime: any;
let errorIterate: boolean = false;

export const check = async (
  iterate: any,
  blocks: Array<string>,
  token: string
) => {
  try {
    const returnedArray = await iterate(blocks, token);
    const endTime = new Date().getTime();
    console.log(
      `Finished, time taken=> ${(endTime - startTime) / 1000} seconds`
    );
    return returnedArray;
  } catch (error) {
    console.log(error);
  }
};

async function getToken(url: string, email: string): Promise<any> {
  const response = await fetch(`${url}/token?email=${email}`);
  return response;
}

const getArray = async (token: string): Promise<Array<string>> => {
  try {
    const response = await fetch(`${url}/blocks?token=${token}`);
    const blocks: {
      data: Array<string>;
      chunkSize: number;
      length: number;
      message?: string;
    } = await response?.json();
    if (!blocks.data) throw new Error(blocks?.message);
    return blocks?.data;
  } catch (error) {
    console.log(error);
  }
};

const compare = async (
  string1: string,
  string2: string,
  token: string
): Promise<any> => {
  try {
    const response = await fetch(`${url}/check?token=${token}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      responseType: "json",
      body: JSON.stringify({
        blocks: [string1, string2],
      }),
    });
    const compareResponse = await response?.json();
    if (
      compareResponse.message === "Too many requests." ||
      typeof compareResponse.message !== "boolean"
    )
      throw new Error(compareResponse.message);
    return compareResponse.message;
  } catch (error) {
    errorIterate = true;
    console.log(error);
  }
};

export const iterate = async (blocks: Array<string>, token: string) => {
  try {
    const sortedArray = Array.isArray(blocks) ? [...blocks] : [];
    const length: number = sortedArray.length;
    let counter = 0;
    for (let item = 0; item < length - 1; item++) {
      for (let innerItem = item; innerItem < length; innerItem++) {
        let sequential: boolean = false;
        if (item !== innerItem) {
          counter++;
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
          console.log("Total api calls: " + counter);
          return sortedArray;
        }
        if (sequential) break;
      }
    }
  } catch (error) {
    console.log(error);
  }
};

getToken(url, email)
  .then(async (resp: any) => {
    token = await resp?.json();
    console.log("Using email: " + email);
    console.log("Token fetched succesfully");
    stringsArray = await getArray(token?.token);
    if (stringsArray) {
      console.log("Array fetched succesfully");
      console.log("Starting to check, please wait...");
      startTime = new Date().getTime();
      const sortedArray = await check(iterate, stringsArray, token?.token);
      if (!errorIterate) {
        console.log("Sorted string:");
        console.log(sortedArray?.join(""));
        console.log("Sorted array:");
        console.log(sortedArray);
      } else console.log("An error has occured, please ty again later");
    }
  })
  .catch((error) => {
    console.log(error);
  });
