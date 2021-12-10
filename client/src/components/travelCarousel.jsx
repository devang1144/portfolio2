import React, { Component } from "react"
import { Link } from 'react-router-dom'
import Slider from "react-slick"
import BlogCard from '../common/blogCard'
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

export default class TravelCarousel extends Component {

  state = {
    travels : []
}

componentDidMount = async() => {
    const { data : travels } = await axios.get('add-blog')
    this.setState({ travels })
    console.log(travels)
}


  render() {
    const travels = this.state.travels === undefined ? null : this.state.travels
    var settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 2,
      slidesToScroll: 1,
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
      <div className="container">
        <Slider {...settings}>
        {travels.map((m, key) => 
                        <div className="col-md-12 p-2 d-flex justify-content-center work-cards p-0">
                            <BlogCard
                                    key={key}
                                    image = {base + 'blog/' + m.blogcardImgRoute}
                                    name = {m.name}
                                    desc = {m.desc}
                                    author = {m.author}
                                    instaid = {m.instaid}
                                    publishedOn={m.publishedOn}
                                    slug={m.slug}
                                    blogInitialLine={m.blogInitialLine}
                                    color={m.color}
                                    /> 
                        </div>    
                    )}
        </Slider>
        <Link to="/travel">
            <h5 className="d-flex justify-content-end travel-carousel-read-more">Read More...</h5>
        </Link>
      </div>
    )
  }
}