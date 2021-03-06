import React from 'react';
import '../Header/Header.css';
import MapIcon from '@material-ui/icons/Map';
import DateRangeIcon from '@material-ui/icons/DateRange';
import FilterListIcon from '@material-ui/icons/FilterList';
import logo from './Logo/Logo.svg'


 const Header= props =>(
    <header className='header'>
        <nav className='header_navigation'>
        <a href='/'><img src={logo} className='logo' alt='animate_logo'/></a>
        <div className='space'/>
        <div className='header_items'>
            <ul>
                <li className={props.colorChangeMap ? 'default' : 'icons'} 
                onClick={props.showMap}>
                <MapIcon   style={{ fontSize: 30 }} id="map"/></li>
                <li className={props.colorChangeList ? 'default' : 'icons'} 
                onClick={props.showList}>
                <DateRangeIcon style={{ fontSize: 30 }} /> </li>
                <li className='icons' onClick={props.showFilters}><a href='/'>
                <FilterListIcon style={{ fontSize: 30 }}/> </a></li>
            </ul>
        </div>
        </nav>
    </header>
     );


export default Header;