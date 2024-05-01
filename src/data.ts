type Product = {
  id: number
  title: string
  desc?: string
  img?: string
  price: number
  options?: { title: string; additionalPrice: number }[]
}

type Products = Product[]

export const featuredProdcuts: Products = [
  {
    id: 1,
    title: 'Pikliz',
    desc: 'Mumu’s Pikliz blends fresh vegetables, spices and herbs to create the perfect addition to your family traditions',
    img: '/temporary/p1.png',
    price: 10,
    options: [
      {
        title: 'Small',
        additionalPrice: 0,
      },
      {
        title: 'Medium',
        additionalPrice: 5,
      },
      {
        title: 'Large',
        additionalPrice: 15,
      },
    ],
  },

  {
    id: 2,
    title: 'Spicy Sweet Corn',
    desc: 'A customer inspired spicy topping made with sweet corn, hot peppers, & salt submerged in vinegar. A more mild alternative than Pikliz',
    img: '/temporary/p2.png',
    price: 12,
    options: [
      {
        title: 'Small',
        additionalPrice: 0,
      },
      {
        title: 'Medium',
        additionalPrice: 6,
      },
      {
        title: 'Large',
        additionalPrice: 8,
      },
    ],
  },

  {
    id: 3,
    title: 'Epis',
    desc: 'The perfect Haitian marinade made with scallions, parsley, green & red peppers, garlic, hot pepper, onion, olive oil, spices & herbs',
    img: '/temporary/p3.png',
    price: 20,
    options: [
      {
        title: 'Small',
        additionalPrice: 0,
      },
      {
        title: 'Medium',
        additionalPrice: 10,
      },
      {
        title: 'Large',
        additionalPrice: 35,
      },
    ],
  },
  {
    id: 4,
    title: 'Aprons',
    desc: 'The perfect combination of fashion to go along with your cooking essentials',
    img: '/temporary/p4.png',
    price: 20,
    options: [
      {
        title: 'Blue',
        additionalPrice: 0,
      },
      {
        title: 'Red',
        additionalPrice: 0,
      },
    ],
  },
  {
    id: 5,
    title: 'Aprons in Jar',
    desc: 'The same perfect combination of fashion to go along with your cooking essentialsm but in a jar',
    img: '/temporary/p4.png',
    price: 20,
    options: [
      {
        title: 'Blue',
        additionalPrice: 0,
      },
      {
        title: 'Red',
        additionalPrice: 0,
      },
    ],
  },
]

type Menu = {
  id: number
  slug: string
  title: string
  desc?: string
  img?: string
  color: string
}[]

export const menu: Menu = [
  {
    id: 1,
    slug: 'pikliz',
    title: 'Pikliz',
    desc: 'Mumu’s Pikliz blends fresh vegetables, spices and herbs to create the perfect addition to your family traditions',
    img: '/temporary/m1.png',
    color: 'white',
  },
  {
    id: 2,
    slug: 'corn',
    title: 'Spicy Corn',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas dicta repellat unde impedit maiores consequuntur ab',
    img: '/temporary/m2.png',
    color: 'white',
  },
  {
    id: 3,
    slug: 'epis',
    title: 'EPIS',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas dicta repellat unde impedit maiores consequuntur ab',
    img: '/temporary/m2.png',
    color: 'white',
  },
]
