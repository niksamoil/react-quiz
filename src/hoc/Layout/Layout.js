import React, { Component } from 'react';
import classes from './Layout.module.css';
import MenuToggle from '../../components/Navigation/MenuToggle/MenuToggle';
import Drawer from '../../components/Navigation/Drawer/Drawer';
import { connect } from 'react-redux';

class Layout extends Component {

    state = {
        menu: false
    }

    toggleMenuHandler = () => {
        this.setState({
            menu: !this.state.menu
        });
    }

    menuCloseHandler = () => {
        this.setState({
            menu: false
        });
    }

    render() {
        return (
            <div className={classes.Layout}>

                <Drawer 
                    isOpen={this.state.menu} 
                    onClose={this.menuCloseHandler}
                    isAuthentificated={this.props.isAuthentificated}
                />

                <MenuToggle 
                    onToggle={this.toggleMenuHandler}
                    isOpen={this.state.menu}
                />

                <main className={classes.Layout}>
                    {this.props.children}
                </main>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthentificated: !!state.auth.token
    };
};

export default connect(mapStateToProps) (Layout);