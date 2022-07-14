import { useState } from "react";
import { useQuery } from "react-query";
//Components
import Item from './Item/Item';
import Cart from "./Cart/Cart";
import Nav from "./Nav/Nav";
import { Drawer } from "@mui/material";
import { LinearProgress } from "@mui/material";
import { Grid } from "@mui/material";
//Styles
import { Wrapper } from "./App.styles";
//Types
export type CartItemType = {
  id: number,
  category: string,
  description: string,
  image: string,
  title: string,
  price: number,
  amount: number,
  rating: object
}

const getProducts = async (): Promise<CartItemType[]> => {
  const res = await fetch('https://fakestoreapi.com/products')
  const data = await res.json()
  return data
}

const App = () => {
  const [cartOpen, setCartOpen] = useState(false)
  const [cartItems, setCartItems] = useState([] as CartItemType[])

  const { data, isLoading, error } = useQuery<CartItemType[]>('products', getProducts)
  console.log(data)

  const getTotalItems = (cartItems: CartItemType[]) =>
    cartItems.reduce((acc: number, item) => acc + item.amount, 0)

  const handleAddToCart = (clickedItem: CartItemType) => {
    setCartItems(prev => {
      const isItemInCart = prev.find(item => item.id === clickedItem.id)

      if (isItemInCart) {
        return prev.map(item =>
          item.id === clickedItem.id
            ? { ...item, amount: item.amount + 1 }
            : item)
      }

      return [...prev, { ...clickedItem, amount: 1 }]
    })
  }

  const handleRemoveFromCart = (id: number) => {
    setCartItems(prev => {
      const previousItem = prev.find(item => item.id === id)

      if (previousItem && previousItem.amount > 1) {
        return prev.map(item =>
          item.id === id
            ? { ...item, amount: item.amount - 1 }
            : item)
      }

      return prev.filter(item => item.id !== id)
    })
  }

  if (isLoading) return <LinearProgress />
  if (error) return <div>Something went wrong...</div>

  return (
    <Wrapper>
      <Nav setCartOpen={setCartOpen} totalItems={getTotalItems(cartItems)}></Nav>
      <Drawer
        anchor="right"
        open={cartOpen}
        onClose={() => setCartOpen(false)}
      >
        <Cart cartItems={cartItems}
          addToCart={handleAddToCart}
          removeFromCart={handleRemoveFromCart}
        />
      </Drawer>
      <Grid container spacing={3}>
        {data?.map((item) => (
          <Grid item key={item.id} xs={12} sm={6} md={4} lg={3}>
            <Item item={item} handleAddToCart={handleAddToCart}></Item>
          </Grid>
        ))}
      </Grid>
    </Wrapper>
  );
}

export default App;
