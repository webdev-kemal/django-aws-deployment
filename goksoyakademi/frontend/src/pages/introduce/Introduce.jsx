import React, { useState } from "react";
import Dropdown from "../../components/dropdown/Dropdown";
import "./Introduce.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import ImageCard from "../../components/cards/imageCard";
import { GridItem, Grid, Select } from "@chakra-ui/react";
import Container from "../../components/containers/container";

const Introduce = () => {
  const collections = [
    {name: "Simple Past Tense", etiketler: ["bu, ödev için önerilen videoları bulacak etiketler"]},
{ name:   "Zaman Zarfları"
},   {name: "Preposition Testi"}
  ];
  const [collectionChange, setCollectionChange] = useState("Bir Ödev Seçin");
  const navigate = useNavigate();
  // const TOTAL_QUESTIONS = 10;

  const startQuiz = () => {
    if (collectionChange !== "Bir Ödev Seçin")
      navigate(`/quiz/${collectionChange}`);
  };

  return (
    <div>
      <div className="mh-100vh">
        <Navbar />
        {/* <div className="container introduce mx-auto mt-4 rounded-5 w-75 p-5 shadow-lg introduce-container"> */}
        {/* <i className="fa-brands fa-google"></i> */}
        <Container>
          <h1>Teslim edilecek ödevi seçin</h1>
          {/* <Dropdown
            data={collections}
            collectionChange={collectionChange}
            setCollectionChange={setCollectionChange}
          /> */}
          <Select variant='filled' placeholder='Ödevi Seçin' onChange={(e) => setCollectionChange(e.target.value)} mb={3} >
            {collections.map((odev, index) => (<option id={index} value={odev.name}>{odev.name}</option>))}
           
            
          </Select>
          <div onClick={startQuiz} className="btn btn-md btn-success">
            Devam et
          </div>
        </Container>

        {/* <div class="container w-75 mt-4 p-5 rounded-5 shadow-lg default-container"> */}
        <Container>
          <h2>Tekrar edebileceğiniz konular</h2>
          <br />
          <Grid templateColumns="repeat(3, 1fr)" gap={3}>
            <GridItem>
              <ImageCard
                videoId={1}
                videoTitle="Zamirler"
                videoCap="12 Dakika"
                videoImage="https://picsum.photos/1920/1080"
                videoProgress={20}
              />
            </GridItem>
            <GridItem>
              <ImageCard
                videoId={2}
                videoTitle="Günlük İfadeler 1"
                videoCap="12 Dakika"
                videoImage="https://picsum.photos/1920/1080"
                videoProgress={70}
              />
            </GridItem>
            <GridItem>
              <ImageCard
                videoId={3}
                videoTitle="Continuous Tense"
                videoCap="12 Dakika"
                videoImage="https://picsum.photos/1920/1080"
                videoProgress={0}
              />
            </GridItem>
            <GridItem>
              <ImageCard
                videoId={4}
                videoTitle="Zamirler"
                videoCap="12 Dakika"
                videoImage="https://picsum.photos/1920/1080"
                videoProgress={90}
              />
            </GridItem>
          </Grid>
        </Container>
      </div>
      <Footer />
    </div>
  );
};

export default Introduce;

// <div class="card card-video mt-3 ">
//   <div class="row no-gutters">
//     <div class="col-md-5">
//       <div class="card-img-container">
//         <img
//           src="teacher1.jpg"
//           class="card-img"
//           alt="Teacher 1"
//         ></img>
//         <i class="fas fa-play play-icon"></i>
//       </div>
//     </div>
//     <div class="col-md-7">
//       <div class="card-body">
//         <h5 class="card-title">İlk Cümleni Kur!</h5>
//         <p class="card-text">5 Dakika</p>
//       </div>
//     </div>
//   </div>
// </div>
