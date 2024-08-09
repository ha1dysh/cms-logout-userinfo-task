### Customer  

- id
- firstName*
- lastName*
- email*
- password*
- phone
- note
- createdAt
- updatedAt
- deletedAt


### CustomerAddress  

- id
- customerId
- country
- firstName
- lastName
- company
- address
- apartment
- city
- postalCode
- phone
- createdAt
- updatedAt

### Category

- id
- title*
- description
- image
- createdAt
- updatedAt
- deletedAt

### Product

- id
- slug*
- title*
- description
- price
- compareAtPrice
- costPerItem
- quantity
- sku
- barcode
- status* (active | draft)
- avgRating*
- totalReviews*
- createdAt
- updatedAt
- deletedAt

### ProductImage

- id
- productId*
- image*

### ProductReview

- id
- productId*
- customerId*
- rate*
- review*
- createdAt
- updatedAt
- deletedAt

### Cart

- id
- customerId
- itemCount*
- totalPrice*
- totalDiscount*
- note
- createdAt
- updatedAt

### CartItem

- id
- cartId*
- productId*
- quantity*
- createdAt

### Order

- id
- customerId*
- totalDiscount*
- totalPrice*
- email*
- note
- customerNote
- phone*
- processedAt
- shippingAddress*
- status (?)
- cancelReason
- canceledAt
- closedAt
- createdAt*
- updatedAt

### OrderItem

- id
- orderId*
- productId*
- productTitle
- productPrice
- productCompareAtPrice
- productCostPerItem
- productSku
- productBarcode
- productImage

## Routes

### auth

- /admin/auth/login
- /admin/auth/recover
- /admin/auth/logout

###  dashboard
- /admin/dashboard

### users
- /admin/users
- /admin/users/new
- /admin/users/:id
- /admin/users/:id/edit
- /admin/users/:id/delete

### customers
- /admin/customers
- /admin/customers/new
- /admin/customers/:id
- /admin/customers/:id/edit

### categories
- /admin/categories
- /admin/categories/new
- /admin/categories/:id
- /admin/categories/:id/edit
- /admin/categories/:id/delete

### products
- /admin/products
- /admin/products/new
- /admin/products/:id
- /admin/products/:id/edit
- /admin/products/:id/reviews

### orders
- /admin/orders
- /admin/orders/new
- /admin/orders/:id
- /admin/orders/:id/edit

### account
- /account/register
- /account/login
- /account/recover
- /account/logout
- /account/info
- /account/orders
- /account/addresses

### cart
/cart

### staff может только управлять продуктами
### добавить правила не аутентификации а авторизации и контроль доступа