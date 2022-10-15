import { makeStyles } from "@material-ui/core/styles";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import Button from "./components/Button";
import { MdDeleteForever, MdFavoriteBorder, MdFavorite } from "react-icons/md";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  grid: {
    width: "50%",
    margin: "0px",
  },
}));

export default function App() {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const LOCAL_STORAGE_DOGS_NAME = "FAVORITE_DOGS_LIST";
  const localStorageDogsList = localStorage.getItem(LOCAL_STORAGE_DOGS_NAME);

  const [dogImages, setDogImages] = React.useState([]);

  const [idList, setIdList] = useState(0);

  const VALID_FORMAT = ["jpg", "png", "gif", "jpeg"];
  let parseDogsList;

  const removeItem = () => {
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

  useEffect(() => {
    // Update the document title using the browser API
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const dogRequests = new Array(12)
        .fill("https://random.dog/woof.json")
        .map((url) =>
          fetch(url)
            .then((resp) => resp.json())
            .then((dogObject) => dogObject.url)
        );

      let dogs = await Promise.all(dogRequests);
      dogs = dogs.filter((img) => VALID_FORMAT.includes(img.split(".")[2]));
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
      <div>
        <Box sx={{ bgcolor: "background.paper" }}>
          <AppBar position="static">
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="secondary"
              textColor="inherit"
              aria-label="full width tabs example"
            >
              <Tab label="Dog Image Gallary" {...a11yProps(0)} />
              <Tab label="Favorites" {...a11yProps(1)} />
            </Tabs>
          </AppBar>
          <SwipeableViews
            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            index={value}
            onChangeIndex={handleChangeIndex}
          >
            <TabPanel value={value} index={0} dir={theme.direction}>
              <div style={{ float: "left", padding: 20, width: "50%" }}>
                <Button
                  onClick={() => {
                    fetchData();
                    // notify('Getting 6 cute dogs for you');
                  }}
                  //icon={<ImImages />}
                  style={{
                    margin: "1em",
                    background: "rgb(80 81 88)",
                    color: "white",
                  }}
                  text={"Next Set of Images"}
                />
              </div>
              <div style={{ float: "left" }}>
                <ImageList cols={3} gap={15} sx={{ width: 1000 }}>
                  {dogImages.slice(0, 6).map((item, index) => (
                    <ImageListItem key={item}>
                      <img
                        src={`${item}?w=50&h=50&fit=crop&auto=format`}
                        srcSet={`${item}?w=50&h=50&fit=crop&auto=format&dpr=2`}
                        alt="dog"
                        loading="lazy"
                      />
                      <Button
                        onClick={() => {
                          saveDogsList(dogImages[index]);
                          alert(
                            "Selected dog image added successfully to your favorites"
                          );
                        }}
                        icon={<MdFavoriteBorder />}
                        style={{
                          margin: "1em",
                          background: "black",
                          color: "white",
                        }}
                        text={"Save to Favorites"}
                      />
                    </ImageListItem>
                  ))}
                </ImageList>
              </div>
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
              <div style={{ float: "left", padding: 20, width: "50%" }}>
                <Button
                  onClick={() => {
                    removeItem();
                  }}
                  icon={<MdDeleteForever />}
                  style={{
                    margin: "1em",
                    background: "rgb(223 43 43)",
                    color: "white",
                  }}
                  text={"Clear Favorites"}
                />
              </div>
              <div style={{ float: "left" }}>
                {favoriteDogs.length > 0 && (
                  <ImageList cols={3} gap={15} sx={{ width: 1000 }}>
                    {favoriteDogs.map((item, index) => (
                      <ImageListItem key={item}>
                        <img
                          src={`${item}?w=50&h=50&fit=crop&auto=format`}
                          srcSet={`${item}?w=50&h=50&fit=crop&auto=format&dpr=2`}
                          alt="dog"
                          loading="lazy"
                        />
                        <Button
                          onClick={() => {
                            deleteFavDog(favoriteDogs[index]);
                            alert(
                              "Selected dog image removed successfully from your favorites"
                            );
                          }}
                          icon={<MdFavorite />}
                          style={{
                            margin: "1em",
                            background: "rgb(223 43 43)",
                            color: "white",
                          }}
                          text={"Remove from Favorites"}
                        />
                      </ImageListItem>
                    ))}
                  </ImageList>
                )}
              </div>
            </TabPanel>
          </SwipeableViews>
        </Box>
      </div>
    </div>
  );
}
