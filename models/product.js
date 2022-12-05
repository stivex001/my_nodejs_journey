const db = require('../util/database')


module.exports = class Product {
    constructor(id, title, imageUrl, description, price) {
      this.id = id;
      this.title = title;
      this.imageUrl = imageUrl;
      this.price = price;
      this.description = description;
    }

    save() {
            
          
     }
      
        static deleteById(id) {
          
        }
      
        static fetchAll() {
          return db.execute('SELECT * FROM products')
        }
      };
      


// // const products = [];
// const path = require("path");
// const fs = require('fs');
// const Cart = require("./cartModel");

// const p = path.join(
//   path.dirname(process.mainModule.filename),
//   "data",
//   "products.json"
// );

// const getProductsFromFile = (cb) => {
//   fs.readFile(p, (err, fileContent) => {
//     if (err) {
//       cb([]);
//     } else {
//       cb(JSON.parse(fileContent));
//     }
//   });
// };

// module.exports = class Product {
//   constructor(id, title, imageUrl, description, price) {
//     this.id = id;
//     this.title = title;
//     this.imageUrl = imageUrl;
//     this.price = price;
//     this.description = description;
//   }

//   save() {
//     getProductsFromFile(products => {
//       if (this.id) {
//         const existingProductIndex = products.findIndex(
//           prod => prod.id === this.id
//         )
//         const updatedProducts = [...products]
//         updatedProducts[existingProductIndex] = this;
//         fs.writeFile(p, JSON.stringify(updatedProducts), err => {
//           console.log(err)
//         })
//       }
//       else {
//         this.id = Math.random().toString();
//         products.push(this);
//       fs.writeFile(p, JSON.stringify(products), err => {
//         console.log(err);
//       })
//       }
      
//     })
    
//   }

//   static deleteById(id) {
//     getProductsFromFile(products => {
//       const product = products.find(prod => prod.id !== id)
//       const updatedProducts = products.filter(prod => prod.id !== id)
//       fs.watchFile(p, JSON.stringify(updatedProducts), (err) => {
//         if(!err) {
//           Cart.deleteProduct(id, product.price)
//         }
//       })
//     })
//   }

//   static fetchAll(cb) {
//     getProductsFromFile(cb);
//   }
// };
