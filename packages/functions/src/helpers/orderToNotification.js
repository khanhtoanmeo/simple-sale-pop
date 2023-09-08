export function orderToNotification({node, shopId, shopifyDomain}) {
  const {createdAt, billingAddress, lineItems} = node;
  const {firstName, city, country} = billingAddress;
  const {id, title, featuredImage} = lineItems.edges[0].node.product;

  return {
    firstName,
    city,
    country,
    productId: id,
    productName: title,
    productImage: featuredImage.url,
    timestamp: createdAt,
    shopId,
    shopifyDomain
  };
}
