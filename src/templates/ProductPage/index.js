import React from 'react'
import { graphql } from 'gatsby'

import SEO from '~/components/seo'
import ProductForm from '~/components/ProductForm'
import { Img, Container } from '~/utils/styles'
import { ProductTitle, ProductDescription } from './styles'
import BreadCrumbs from '~/components/BreadCrumbs'

const ProductPage = ({ data }) => {
  const product = data.shopifyProduct
  return (
    <div>
      <SEO title={product.title} description={product.description} />
      <BreadCrumbs menu={product.title} />
      {product.images.map(image => (
        <Img
          fluid={image.localFile.childImageSharp.fluid}
          key={image.id}
          alt={product.title}
        />
      ))}
      <Container>
        <ProductTitle>{product.title.toUpperCase()}</ProductTitle>
        <ProductDescription
          dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
        />
        <ProductForm product={product} />
      </Container>
    </div>
  )
}

export const query = graphql`
  query($handle: String!) {
    shopifyProduct(handle: { eq: $handle }) {
      id
      title
      handle
      productType
      description
      descriptionHtml
      shopifyId
      options {
        id
        name
        values
      }
      variants {
        sku
        id
        title
        price
        availableForSale
        shopifyId
        selectedOptions {
          name
          value
        }
      }
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
        maxVariantPrice {
          amount
          currencyCode
        }
      }
      images {
        originalSrc
        id
        localFile {
          childImageSharp {
            fluid(maxWidth: 910) {
              ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
          }
        }
      }
    }
  }
`

export default ProductPage
