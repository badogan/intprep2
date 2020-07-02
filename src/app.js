const getAllPosts = require("../APIsHelpers/API").getAllPosts;
const getASpecificPostWithId = require("../APIsHelpers/API")
  .getASpecificPostWithId;
const getAllUsers = require("../APIsHelpers/API").getAllUsers;
const writeToFile = require("../APIsHelpers/fileOps").writeToFile;

const outputFileURL = "./output.txt";

// getAllPosts()
//   .then(data => data)
//   .catch(err => console.log(err));

//Objective: Let's find the users with the minimum and maximum length of posts among the first 50 posts.
//Expected Output: File including the Emails and Names of the users with max and min posts

async function bringFirstNPosts(n = 10) {
  let resultArr = [];
  for (let i = 1; i <= n; i++) {
    await getASpecificPostWithId(i)
      .then(data => {
        resultArr.push(data);
      })
      .catch(err => console.log(err));
  }
  return resultArr;
}

function convert(arrOfPostsToHash) {
  //Objective: Summarizes the array so that it will provide a basic hash
  //Output hash includes key,value pairs with:
  //key: userId
  //value: maximumLength of the posts the "key" has in the array
  let hash = {}; //{"userId":"maxLength"}
  arrOfPostsToHash.map(item => {
    if (hash[item.userId]) {
      if (hash[item.userId] < item.body.length) {
        hash[item.userId] = item.body.length;
      }
    } else {
      hash[item.userId] = item.body.length;
    }
  });
  return hash;
}

function findMaxAndMinKeyValuePairs(hash) {
  const sortedKeys = Object.values(hash).sort((a, b) => (a > b ? 1 : -1));
  const maxValue = sortedKeys[sortedKeys.length - 1];
  const minValue = sortedKeys[0];
  const minKey = Object.keys(hash).filter(key => hash[key] === minValue)[0];
  const maxKey = Object.keys(hash).filter(key => hash[key] === maxValue)[0];
  let min = {};
  min["userId"] = minKey;
  min["length"] = minValue;
  let max = {};
  max["userId"] = maxKey;
  max["length"] = maxValue;
  return [min, max]; //intended [{userId:value},{userId:value}] 0:min, 1:max
}

async function bringMinAndMaxUsers(minUserId, maxUserId) {
  const usersArr = await getAllUsers()
    .then(data => data)
    .catch(err => console.log(err));
  const minUserObj = usersArr.filter(user => user.id === parseInt(minUserId));
  const maxUserObj = usersArr.filter(user => user.id === parseInt(maxUserId));
  return [minUserObj, maxUserObj];
}

function saveToFile(decisionObj) {
  let minObj = decisionObj[0];
  let maxObj = decisionObj[1];
  let minLine = `Min Length:${minObj.length} chars | Username: ${minObj.userDetails[0].username}`;
  let maxLine = `Max Length:${maxObj.length} chars | Username: ${maxObj.userDetails[0].username}`;
  writeToFile(outputFileURL, minLine);
  writeToFile(outputFileURL, maxLine);
}

async function main(N) {
  const firstNPosts = await bringFirstNPosts(N).then(data => data);
  const hash = convert(firstNPosts);
  const decisionObj = findMaxAndMinKeyValuePairs(hash);
  const minAndMaxUsers = await bringMinAndMaxUsers(
    decisionObj[0].userId,
    decisionObj[1].userId
  );
  decisionObj[0]["userDetails"] = minAndMaxUsers[0];
  decisionObj[1]["userDetails"] = minAndMaxUsers[1];
  saveToFile(decisionObj);
}

function testBooleanFunction(num) {
  return num === 10;
}

const testTypeFunction = input => typeof input;

main(40);

module.exports = { testBooleanFunction, testTypeFunction, bringFirstNPosts }; //For now only for testing purposes
