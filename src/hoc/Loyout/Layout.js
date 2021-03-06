import React, {Component} from "react"
import s from "./Layout.module.css"
import MenuToggle from "../../components/Navigation/Navigation.js"
import Drawer from "../../components/Navigation/Drawer/Drawer.js"

class Layout extends Component {

    state = {
        menu: false
    }        

    toggleMenuHandler = () => {
        this.setState(
                {menu: !this.state.menu}
           
        )
    }

    menuCloseHandler  ()  {
        this.setState(
            {menu: false}
        )
    }

    render () {
        return(
            <div className= {s.Layout}>
                <Drawer 
                    isOpen  = {this.state.menu} 
                    onClose = { this.menuCloseHandler.bind(this) }
                />


                <MenuToggle 
                  onToggle ={this.toggleMenuHandler}
                  isOpen = {this.state.menu}
                />

                <main>
                    {this.props.children}
                </main>
            </div>
        ) 
    }
}

export default Layout;