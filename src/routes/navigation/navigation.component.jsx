import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import "./navigation.style.scss"; 
import CartIcon from "../../components/cart-icon/cart-icon.component"; 
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component"; 
import { CartContext } from "../../context/cart.context";
import { UserContext } from "../../context/user.context";
import { signOutUser } from "../../utils/firebase/firebase.utils"; 

const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  const {isCartOpen} =useContext(CartContext)
  return (
    <Fragment>
      <nav className="navigation">
        <Link className="logo-container" to="/">
          <CrwnLogo className="logo" />
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
            SHOP
          </Link> 
          <Link className="nav-link" to="/shop">
            CONTACT
          </Link>
          {currentUser ? (
            <span className="nav-link" onClick={signOutUser}>
              SIGN OUT
            </span>
          ) : (
            <Link className="nav-link" to="/auth">
              SIGN IN
            </Link>
          )}
         <CartIcon/> 

        </div>  
       {isCartOpen && <CartDropdown/>}
      </nav>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
