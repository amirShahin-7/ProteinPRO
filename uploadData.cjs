const admin = require("firebase-admin");
// Replace this with the absolute path to your Firebase service account private key file.
const serviceAccount = require("./protein-pro-6ea7a-firebase-adminsdk-fbsvc-3092609952.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();


const products = [
  {
    name: "iso add",
    description:
      "Muscle Add | ISO ADD | Whey Protein | Blend of Hydrolized & Isolate whey protein | 100% whey protein ",
    price: 2150,
    image: "https://m.media-amazon.com/images/I/61nn59e-OuL._AC._SR360,460.jpg",
  },
  {
    name: "kayy",
    description: "Kayy whey protein oats with coconut flavor - 300 gm ",
    price: 52,
    image: "https://m.media-amazon.com/images/I/816-Tv-a+aL._AC._SR360,460.jpg",
  },
  {
    name: "imtenan",
    description: "Imtenan Whey protein cocoa flavor 500gm",
    price: 785,
    image: "https://m.media-amazon.com/images/I/71cau8pLAOL._AC._SR360,460.jpg",
  },
  {
    name: "red rex",
    description: " Big Whey Protein 2 kg, Chocolate",
    price: 2790,
    image: "https://m.media-amazon.com/images/I/61A7gXOae9L._AC._SR360,460.jpg",
  },
  {
    name: "Advanced Sports",
    description: "Advanced Sports Nutrition (ASN) | 100% Whey Protein | Banana",
    price: 1716,
    image: "https://m.media-amazon.com/images/I/61won-NU8FL._AC._SR360,460.jpg",
  },
  {
    name: "Shadowhey",
    description: "DY Nutrition - Shadowhey Hydrolysate, Chocolate - 2270gn",
    price: 4500,
    image: "https://m.media-amazon.com/images/I/71jtTg1yLqL._AC._SR360,460.jpg",
  },
  {
    name: "watch me",
    description: "Watchme Whey Isolate 1 Kg- Chocolate Cookies",
    price: 1700,
    image: "https://m.media-amazon.com/images/I/61BGpsrmuoL._AC._SR360,460.jpg",
  },
  {
    name: "iso 100",
    description: "ISO100 Gourmet Chocolate (2.3)",
    price: 4000,
    image: "https://m.media-amazon.com/images/I/51+AnnOIYlL._AC._SR360,460.jpg",
  },
  {
    name: "Creatine 5000",
    description:
      "Advanced Sports Nutrition (ASN) | Advanced Creatine 5000 | Unflavoured",
    price: 780,
    image: "https://m.media-amazon.com/images/I/51wz-Ncko9L._AC._SR360,460.jpg",
  },
  {
    name: "chocolate protein",
    description:
      "Challenger nutrition - 100% whey protein, chocolate, 2.276 kg",
    price: 2690,
    image: "https://m.media-amazon.com/images/I/61-l2DLSF2L._AC._SR360,460.jpg",
  },
  {
    name: "concentrate Vanilla",
    description:
      "Limitless Whey Protein concentrate Vanilla 30 Scoops Powder 1KG",
    price: 1729,
    image: "https://m.media-amazon.com/images/I/71vR28hTCoL._AC._SR360,460.jpg",
  },
  {
    name: "isolate strawberry",
    description: "Challenger nutrition - whey isolate, strawberry, 1.8 kg",
    price: 2990,
    image: "https://m.media-amazon.com/images/I/61hS+OyHvQL._AC._SR360,460.jpg",
  },
];

const users = [
  {
    name: "Amir",
    Email: "mirosushi1@gmail.com",
    password: "0147852", // Note: Storing passwords in plaintext is not secure. You should hash passwords before storing them.
    role: "user",
  },
  {
    name: "Amir2",
    Email: "miro",
    password: "123456", // Note: Storing passwords in plaintext is not secure. You should hash passwords before storing them.
    role: "admin",
  },
];

async function uploadData() {
  // Upload products
  for (const product of products) {
    await db.collection("products").add(product);
    console.log(`Added product: ${product.name}`);
  }

  // Upload users
  for (const user of users) {
    // Note: In a real application, you should not store passwords in plaintext.
    // Use Firebase Authentication for managing users and securely storing their credentials.
    await db.collection("users").add(user);
    console.log(`Added user: ${user.name}`);
  }

  console.log("Data upload complete.");
}

uploadData().catch((error) => {
  console.error("Error uploading data:", error);
});
