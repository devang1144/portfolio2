import React, { Component } from 'react'

import axios, { base } from '../axios-pf'
import { motion } from 'framer-motion'

import Test from '../assets/test-img.png'

import DevCard from '../common/developerBlogCard'

class DeveloperBlogs extends Component {

    state = {
        banner : "",
        blogs : []
    }

    componentDidMount = async() => {
        const { data:blogs } = await axios.get('/devblog/get')
        this.setState({ blogs })
    }
    

    render() {
        const blogs = this.state.blogs === undefined ? null : this.state.blogs
        return (
            <div className="container-fluid p-0">
                <div className="row m-0 no-gutters">
                    <div className="d-blog-left col-md-3">
                        <h6 className="main-badge">Blogs for developers</h6>
                        <h2 className="main-heading">
                            these blogs cover various computer science topics and algorithms
                        </h2>
                        {/* <h6 className="main-content">Stay tuned for updates</h6> */}
                    </div>
                    <div className="d-blog-right offset-md-3 col-md-9">
                        <div className="row m-0">
                            {blogs.map((m, key) => <DevCard key={key} title={m.cardtitle} content={m.content} date={m.publishedOn} slug={m.slug} card={base + m.cardBanner}/>)}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default DeveloperBlogs;