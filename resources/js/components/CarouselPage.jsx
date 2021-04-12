import React, { Component } from "react";
import { Carousel, CarouselCaption, CarouselInner, CarouselItem, View, Mask } from "mdbreact";
import '../../sass/CarouselPage.css'

const img1 = '/images/banner1.jpg';
const img2 = '/images/banner2.jpg';
const img3 = '/images/banner3.jpg';

class CarouselPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Carousel activeItem={1} length={3} showControls={false} showIndicators={true} className=" carousel z-depth-1" type="carousel"> 
        <img className="logo-container" src="/images/brand2.png"  alt="logo2"></img>
        <CarouselInner >
          <CarouselItem itemId="1">
            <View align="center">
              <img align="center" className="d-block w-100 mt-6" src={img1} alt="First slide" />
              <Mask overlay="black-slight" />
            </View>
        
          </CarouselItem>
          <CarouselItem itemId="2">
            <View align="center">
              <img className="d-block w-100 mt-6" src={img2} alt="Second slide" />
              <Mask overlay="black-slight" />
            </View>
        
          </CarouselItem>
          <CarouselItem itemId="3">
            <View align="center">
              <img className="d-block w-100 mt-6" src={img3} alt="Third slide" />
              <Mask overlay="black-slight" />
            </View>
      
          </CarouselItem>
        </CarouselInner>
        
      </Carousel>
    );
  }
}

export default CarouselPage;