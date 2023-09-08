export function getLatestOrdersQueryStr(num) {
  return `{
    orders(first: ${num},sortKey:CREATED_AT,reverse:true) {
      edges {
        node {
          createdAt
          billingAddress{
            firstName
            city
            country
          }
          lineItems(first:1){
            edges{
              node{
                product{
                  id
                  title
                  featuredImage{
                    url
                  }     
                }
              }
            }
          }   
        }
      }
    }
  }`;
}
