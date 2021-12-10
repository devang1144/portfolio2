import React, { Component } from "react"
import Slider from "react-slick"
import WorkCard from '../common/workCard'
import axios, { base } from '../axios-pf'
import RightArrow from '../assets/right-arrow.svg'
import LeftArrow from '../assets/left-arrow.svg'

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <img className="slick-arrow slick-next" onClick={onClick} src={RightArrow} alt="" />
  )
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <img className="slick-arrow slick-prev" onClick={onClick} src={LeftArrow} alt="" />
  )
}

export default class ProjectCarousel extends Component {

  state = {
    projects : []
}

componentDidMount = async() => {
    const { data : projects } = await axios.get('add-project/get')
    this.setState({ projects })
}


  render() {
    const projects = this.state.projects === undefined ? null : this.state.projects
    var settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 3,
      initialSlide: 0,
      prevArrow : <SamplePrevArrow/>,
      nextArrow : <SampleNextArrow/>,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    }
    return (
      <div className="container-fluid">
        <Slider {...settings}>
        {projects.map(m => 
                        <div className="col-md-12 p-2 d-flex justify-content-center work-cards p-0">
                            <WorkCard title={m.name} description={m.desc} link={m.link} image={m.image} />
                        </div>    
                    )}
        </Slider>
      </div>
    )
  }
}