// import "./styles.css";
import Grid from "@material-ui/core/Grid";
import ImageDisplay from "./components/ImageDisplay";
import { makeStyles } from "@material-ui/core/styles";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import Button from "./components/Button";
import {MdDeleteForever, MdFavoriteBorder, MdFavorite } from "react-icons/md";

const useStyles = makeStyles((theme) => ({
  grid: {
    width: "50%",
    margin: "0px",
  },
}));

export default function App() {
  const LOCAL_STORAGE_DOGS_NAME = "FAVORITE_DOGS_LIST";
  const localStorageDogsList = localStorage.getItem(LOCAL_STORAGE_DOGS_NAME);

  const classes = useStyles;
  const [dogImages, setDogImages] = React.useState([]);

  const [idList, setIdList] = useState(0);
  const [dogsList, setDogsList] = useState([]);
  const [selectedImage, setSelectedImage] = useState(0);

  const VALID_FORMAT = ["jpg", "png", "gif", "jpeg"];
  let parseDogsList;

  const removeItem = (index) => {
    setFavoriteDogs({});
    localStorage.removeItem(LOCAL_STORAGE_DOGS_NAME);
  };

  const storeDogs = (store) => {
    localStorage.setItem(LOCAL_STORAGE_DOGS_NAME, store);
  };

  if (!localStorageDogsList) {
    localStorage.setItem(LOCAL_STORAGE_DOGS_NAME, JSON.stringify([]));
    parseDogsList = [];
  } else {
    parseDogsList = JSON.parse(localStorageDogsList);
  }

  const [favoriteDogs, setFavoriteDogs] = useState(parseDogsList);

  useEffect(() => {
    setIdList(idList + 1);
  }, [favoriteDogs]);

  const saveDogsList = (dogsList) => {
    let newList = favoriteDogs;
    newList.push(dogsList);
    const strigifiedDogList = JSON.stringify(newList);

    storeDogs(strigifiedDogList);
    setFavoriteDogs([...newList]);
  };
  const deleteFavDog = (favDogList) => {
    const newList = favoriteDogs.filter((item) => item !== favDogList);
    const strigifiedDogList = JSON.stringify(newList);

    storeDogs(strigifiedDogList);
    setFavoriteDogs([...newList]);
  };

  const fetchData = async () => {
    try {
      const dogRequests = new Array(30)
        .fill("https://random.dog/woof.json")
        .map((url) =>
          fetch(url)
            .then((resp) => resp.json())
            .then((dogObject) => dogObject.url)
        );

      let dogs = await Promise.all(dogRequests);
      dogs = dogs.filter((img) => VALID_FORMAT.includes(img.split('.')[2]));
      setDogImages(dogs);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Dog Images Gallary</Navbar.Brand>
        </Container>
      </Navbar>
      <div
        style={{
          width: "100%",
          justifyContent: "center",
          flexDirection: "column",
          display: "flex",
          alignItems: "center",
          float: "left",
          marginLeft: "auto",
          marginRight: "auto",
          height: "auto",
          width: "auto",
        }}
      >
        <div style={{ float: "left" }}>
          <Grid container spacing={3} className={classes.grid}>
            {dogImages.slice(0, 6).map((dogImage, index) => (
              <Grid key={index} item xs={4}>
                <ImageDisplay  onClick={() => {}} imageUrl={dogImage} />
                <Button
                  onClick={() => {
                    saveDogsList(dogImages[index]);
                    alert("Selected dog image added successfully to your favorites");
                  }}
                  icon={<MdFavoriteBorder />}
                  style={{ background: "black", color: "white" }}
                  text={"Save to Favorites"}
                />
              </Grid>
            ))}
          </Grid>
        </div>
        <div style={{ float: "left", padding: 20, width: "100%" }}>
          <Button
            onClick={() => {
              fetchData();
              // notify('Getting 6 cute dogs for you');
            }}
            //icon={<ImImages />}
            style={{ margin: "1em",  background: "rgb(80 81 88)", color: "white" }}
            
            text={"Next Set of Images"}
          />
          <Button
            onClick={() => {
              removeItem();
              // notify('Getting 6 cute dogs for you');
            }}
            icon={<MdDeleteForever />}
            style={{ background: "#0C21D3", color: "white" }}
            text={"Clear Favorites"}
          />
        </div>

        <div style={{ float: "left" }}>
          {favoriteDogs.length > 0 && (
            <Grid container spacing={3} className={classes.grid}>
              {favoriteDogs.map((dogImage, index) => (
                <Grid key={index} item xs={4}>
                  <ImageDisplay imageUrl={dogImage} />
                  <Button
                    onClick={() => {
                      deleteFavDog(favoriteDogs[index]);
                      alert("Selected dog image removed successfully from your favorites");
                    }}
                    icon={<MdFavorite />}
                    style={{ margin: "1em", background: "rgb(223 43 43)", color: "white" }}
                    text={"Remove from Favorites"}
                  />
                </Grid>
              ))}
            </Grid>
          )}
        </div>
      </div>
    </div>
  );
}
