// export async function login(req, res) {
//     console.log('🟡 Login body:', req.body);
//     try {
//       const supplier = await findSupplierByGivenInfo(req.body);
//       console.log('supplier:', supplier)
//       if (supplier) {
//         res.json({ success: true, supplier });
//       } else {
//         res.status(401).json({ success: false, message: 'Invalid login' });
//       }
//     } catch (error) {
//       res.status(500).json({ success: false, message: error.message });
//     }
//   }
  

// export const addUser = async (user) => {
// const { name, email } = user;

// try {
// const [result] = await db.query(
// 'INSERT INTO users (name, email) VALUES (??)',
// [name, email]
// );

// return result.insertld;
// } catch (error) {
// ('Error adding data') throw new Error
// }

// };