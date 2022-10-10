// import React, { useState } from "react";
// import Button from "../../Components/Button";
// import Gallery from "../../Components/Gallery";
// import { AiFillDelete } from "react-icons/ai";

// const Favorites = ({ storeDogs, parseDogsList, notify }) => {
//   const [idList, setIdList] = useState(0);
//   const [selectedDogDelete, setSelectedDogDelete] = useState(0);
//   const [favoriteDogs, setFavoriteDogs] = useState(parseDogsList);

//   const deleteFavDog = (favDogList) => {
//     const strigifiedDogList = JSON.stringify(favDogList);
//     storeDogs(strigifiedDogList);
//     setFavoriteDogs([...favDogList]);
    
//   };

//   return (
//     <div key={idList} style={{ height: "100%" }}>
//       {" "}
//       {favoriteDogs.length > 0 && (
//         <Gallery
//           onChange={(imageIndex) => {
//             setSelectedDogDelete(imageIndex);
//           }}
//         >
//           {favoriteDogs.map((dog, index) => (
//             <div
//               style={{
//                 height: "auto",
//                 justifyContent: "center",
//                 display: "flex",
//                 alignItems: "center",
//               }}
//             >
//               <img key={index} src={dog.url} style={{ width: "50%" }} />
//             </div>
//           ))}
//         </Gallery>
//       )}
//       <div
//         style={{
//           height: "auto",
//           justifyContent: "center",
//           display: "flex",
//           alignItems: "center",
//         }}
//       >
//         <button
//           onClick={() => {
//             let newFavDogList = favoriteDogs.filter(
//               (dog, index) => index != selectedDogDelete
//             );
//             deleteFavDog(newFavDogList);
//             notify("Dog removed from your favorite");
//           }}
//           style={{ background: "red", color: "white" }}
//           icon={<AiFillDelete />}
//           text={"Delete from Favorites"}
//         />
//       </div>
//     </div>
//   );
// };

// export default Favorites;