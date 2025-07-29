const users = [
  { id: 1, username: "john_doe" },
  { id: 2, username: "jane_smith" },
  { id: 3, username: "alice" },
];

// 🔹 1. Callback
function getUserDataCallback(userId, callback) {
  setTimeout(() => {
    const user = users.find((u) => u.id === userId);
    if (user) {
      callback(null, user);
    } else {
      callback(new Error("User not found"), null);
    }
  }, 1000);
}

// 🔹 2. Promise
function getUserDataPromise(userId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = users.find((u) => u.id === userId);
      if (user) {
        resolve(user);
      } else {
        reject(new Error("User not found"));
      }
    }, 1000);
  });
}

// 🔹 3. Async/Await
async function getUserDataAsync(userId) {
  try {
    const user = await getUserDataPromise(userId);
    return user;
  } catch (err) {
    return err.message;
  }
}
// ✅ Callback Test
getUserDataCallback(1, (err, user) => {
  if (err) {
    console.error("Callback Error:", err.message);
  } else {
    console.log("Callback Result:", user);
  }
});

// ✅ Promise Test
getUserDataPromise(2)
  .then((user) => {
    console.log("Promise Result:", user);
  })
  .catch((err) => {
    console.error("Promise Error:", err.message);
  });

// ✅ Async/Await Test
(async () => {
  const user = await getUserDataAsync(3);
  console.log("Async/Await Result:", user);
})();
