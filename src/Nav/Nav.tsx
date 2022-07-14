import { AddShoppingCart } from "@mui/icons-material";
import { Badge } from "@mui/material";
import { AppBar } from "@mui/material";
import { Button } from "@mui/material";
import { Toolbar } from "@mui/material";
import { Typography } from "@mui/material";
import React from "react";

type Props = {
    setCartOpen: React.Dispatch<React.SetStateAction<boolean>>
    totalItems: number
}

const Nav: React.FC<Props> = ({setCartOpen, totalItems}) => (
    <AppBar>
        <Toolbar>
          <Typography component="div" sx={{flexGrow: 1}} >ShoppingWebsite</Typography>
          <Button onClick={() => setCartOpen(true)}>
            <Badge badgeContent={totalItems} color='error'>
              <AddShoppingCart color="action">
              </AddShoppingCart>
            </Badge>
          </Button>
        </Toolbar>
      </AppBar>
)

export default Nav