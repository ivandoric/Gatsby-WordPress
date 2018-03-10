const _ = require(`lodash`);
const Promise = require(`bluebird`);
const path = require(`path`);
const slash = require(`slash`);

const pageQuery = `
{
  allWordpressPage {
    edges {
      node {
        id
        slug
        status
        template
      }
    }
  }
}
`

const postsQuery = `
{
  allWordpressPost {
    edges {
      node {
        id
        slug
        status
        template
        format
      }
    }
  }
}
`


exports.createPages = ({ graphql, boundActionCreators }) => {
    const { createPage } = boundActionCreators;


    return new Promise((resolve, reject) => {

        // Pages
        graphql(pageQuery)
            .then(result => {
                if (result.errors) {
                    console.log(result.errors);
                    reject(result.errors);
                }

                const pageTemplate = path.resolve("./src/templates/page.js");

                _.each(result.data.allWordpressPage.edges, edge => {
                    createPage({
                        path: `/${edge.node.slug}/`,
                        component: slash(pageTemplate),
                        context: {
                            id: edge.node.id,
                        },
                    });
                });
            })

            .then(() => {
                graphql(postsQuery)
                    .then(result => {
                        if (result.errors) {
                            console.log(result.errors);
                            reject(result.errors);
                        }
                        const postTemplate = path.resolve("./src/templates/post.js");

                        _.each(result.data.allWordpressPost.edges, edge => {
                            createPage({
                                path: `/post/${edge.node.slug}/`,
                                component: slash(postTemplate),
                                context: {
                                    id: edge.node.id,
                                },
                            });
                        });
                        resolve();
                    });
            });
        // ==== END POSTS ====
    });
};