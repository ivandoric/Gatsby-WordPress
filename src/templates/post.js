import React, { Component } from "react"
import PropTypes from "prop-types"
import Img from "gatsby-image"

class PostTemplate extends Component {
    render() {
        const post = this.props.data.wordpressPost

        console.log(post)

        let facebook = ''
        let twitter = ''

        if(post.acf !== null) {

            if(post.acf.facebook !== '') {
                facebook = `<h3>Facebook</h3> ${post.acf.facebook}`
            }

            if(post.acf.twitter !== '') {
                twitter = `<h3>Twitter</h3> ${post.acf.twitter}`
            }

        }

        return (
            <div>
                <h1 dangerouslySetInnerHTML={{ __html: post.title }} />
                <div dangerouslySetInnerHTML={{ __html: post.content }} />

                <div dangerouslySetInnerHTML={{__html: facebook}}></div>
                <div dangerouslySetInnerHTML={{__html: twitter}}></div>

                {/*{post.acf !== null &&
                    <div>
                        <h3>Facebook</h3>
                        {post.acf.facebook}

                            <h3>Twitter</h3>
                        {post.acf.twitter}
                    </div>
                }*/}
            </div>
        )
    }
}


export default PostTemplate

export const pageQuery = graphql`
    query currentPostQuery($id: String!) {
        wordpressPost(id: { eq: $id }) {
            title
            content
            acf {
                facebook
                twitter
            }
        }
        site {
            siteMetadata {
                title
                subtitle
            }
        }
    }
`