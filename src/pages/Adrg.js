import React, { useState } from 'react';
import "./adrg.css";
import IconButton from '@mui/material/IconButton';
import TextField from "@mui/material/TextField";
import users from "./constant/users.json";
import timbri from "./constant/timbri.json";
import { FixedSizeList } from 'react-window';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import Divider from "@mui/material/Divider";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SearchIcon from '@mui/icons-material/Search';

import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';

function renderRow(props) {
    const { data, index, style } = props;
    const { status, list } = data;
    const obj = list[index];
    return (
        <ListItem style={style} key={index} disablePadding>
            <ListItemButton style={{ height: "100%" }}>
                <User name={obj.name} surname={obj.surname} matricola={obj.matricola} wide={status} />
            </ListItemButton>
        </ListItem>
    );
}

const User = ({ name, surname, matricola }) => {

    return (
        <Grid container style={{ position: "relative", width: "100%" }}>
            <Grid item xs={12} md={6}>
                <span style={{ color: "#4b2f70", fontWeight: "bold" }}>{matricola} </span>
            </Grid>
            <Grid item xs={12} md={6}>
                <span style={{ margin: "0 auto", textAlign: "center", width: "100%" }}>{name} {surname}</span>
            </Grid>
        </Grid>
    )
}

{
    /*
    
   
            
            */
}
const Adrg = () => {

    return (
        <div className="adrg-container">
            <Grid container spacing={2}>
                <UserSide />
                <AdrgSide />
            </Grid>
        </div>
    );
};


const UserSide = () => {
    return (
        <Grid item md={12} lg={3} className="user-side">
            <div className="top-user-side">
                <Grid container style={{ display: "flex", alignItems: "center" }}>
                    <Grid item xs={10} md={10}><TextField variant="outlined" label="Cerca..." InputProps={{
                        endAdornment: (
                            <InputAdornment><SearchIcon /></InputAdornment>
                        )
                    }} /></Grid>
                    <Grid item xs={2} md={2}><IconButton><FilterAltIcon /></IconButton></Grid>
                </Grid>
            </div>
            <div className='list-user-side'>
                <UserList />
            </div>
        </Grid>
    )
}

const UserList = () => {
    return (
        <div>
            <Grid container style={{ position: "relative", width: "100%", textAlign: "left", padding: "20px" }}>
                <Grid item xs={12} md={6}>
                    <span style={{ color: "#4b2f70", fontWeight: "bold" }}>Mat</span>
                </Grid>
                <Grid item xs={12} md={6}>
                    <span style={{ margin: "0 auto", width: "100%", fontWeight: "bold" }}>Nome Cognome</span>
                </Grid>
            </Grid>
            <Divider />
            <FixedSizeList
                style={{ margin: "0 auto" }}
                height={680}
                width={"100%"}
                itemSize={60}
                itemCount={users.length}
                overscanCount={5}
                itemData={{ list: users }}
            >
                {renderRow}
            </FixedSizeList>
        </div>

    )
}


const AdrgSide = () => {

    const [month, setMonth] = useState(1);

    const handleChange = (event) => {
        setMonth(event.target.value);
    };
    return (
        <Grid item md={12} lg={9} className="adrg-side">
            <div className="user-data">
                <span>Matricola Name Surname</span>
            </div>
            <Grid item container className="adrg-box">
                <Grid item xs={12} md={4} className="day-side">
                    <div classname="month-select-day-side">
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Mese</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={month}
                                label="Mese"
                                onChange={handleChange}
                            >
                                <MenuItem value={1}>Gennaio</MenuItem>
                                <MenuItem value={2}>Febbraio</MenuItem>
                                <MenuItem value={3}>Marzo</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <div className="day-select-day-side">
                        <DayList />
                    </div>
                </Grid>
                <Grid item xs={12} md={8} className="adrg-data">
                    <AdrgData />
                </Grid>
            </Grid>
        </Grid >
    )
}

const DayList = () => {
    return (
        <List>
            {timbri.map((obj) => {
                return (
                    <ListItem style={{ borderBottom: "1px solid rgba(0,0,0,0.2)" }} disablePadding>
                        <ListItemButton>
                            <div>
                                <span style={{ fontWeight: "bold", color: "gray" }}>{obj.day}</span>
                            </div>
                        </ListItemButton>
                    </ListItem>
                )
            })}
        </List>
    )
}

const AdrgData = () => {

    const [showStandard, setShowStandard] = useState(false);

    return (
        <div style={{ width: "90%", margin: "0 auto" }}>
            <Grid container spacing={2}>
                <Grid item xs={12} style={{ width: "100%", minWidth: "300px" }} >
                    <div style={{ boxShadow: "0px 0px 10px rgba(0,0,0,0.2)", padding: "10px 15px", width: "100%", fontWeight: "bold", fontSize: "10px", borderRadius: "15px", backgroundColor: "#3d046e", color: "white", textTransform: "uppercase", textAlign: "center" }}><p style={{ width: "60%", textAlign: "center", margin: "0 auto" }}>Valore del Giorno </p>
                        <span style={{ fontWeight: "bold", fontSize: "28px", color: "#9ba8eb" }}>8.00</span></div></Grid>
                <Grid item md={12} lg={6} style={{ width: "100%", minWidth: "300px" }} >
                    <div style={{ boxShadow: "0px 0px 10px rgba(0,0,0,0.2)", padding: "10px 15px", width: "100%", margin: "0 auto", fontWeight: "bold", fontSize: "10px", borderRadius: "15px", backgroundColor: "#3d046e", color: "white", textTransform: "uppercase", textAlign: "center" }}><p style={{ width: "60%", textAlign: "center", margin: "0 auto" }}>Ore <br /> Lavorate </p>
                        <span style={{ fontWeight: "bold", fontSize: "28px", color: "#ffffff" }}>8.00</span></div></Grid>
                <Grid item md={12} lg={6} style={{ width: "100%", minWidth: "300px" }} >
                    <div style={{ boxShadow: "0px 0px 10px rgba(0,0,0,0.2)", padding: "10px 15px", width: "100%", margin: "0 auto", fontWeight: "bold", fontSize: "10px", borderRadius: "15px", backgroundColor: "#3d046e", color: "white", textTransform: "uppercase", textAlign: "center" }}><p style={{ width: "60%", textAlign: "center", margin: "0 auto" }}>Ore <br /> Ordinarie</p>
                        <span style={{ fontWeight: "bold", fontSize: "28px", color: "#ffffff" }}>8.00</span></div></Grid>
            </Grid>
            <div className={showStandard ? "adrg-today-time-show" : "adrg-today-time"}>
                <h2 style={{ fontSize: "16px", textTransform: "uppercase", color: "rgba(0,0,0,0.7)" }}>Orario</h2>
                <Timbratura color="#045754" inside="8.30" outside="12.30" />
                <Timbratura color="#045754" inside="13.30" outside="17.30" />
            </div>
            <Divider style={{ marginTop: "10px", marginBottom: "10px" }}><IconButton onClick={() => { setShowStandard(curr => !curr) }} style={{ backgroundColor: "#406ac9", color: "white" }}>{showStandard ? <ExpandLessIcon /> : <ExpandMoreIcon />}</IconButton></Divider>




            <div className="adrg-timbrature">
                <h2 style={{ fontSize: "16px", textTransform: "uppercase", color: "rgba(0,0,0,0.7)" }}>Timbrature</h2>
                <Timbratura inside="8.30" outside="12.40" />
                <Timbratura inside="13.40" outside="17.30" />
            </div>
        </div >
    )
}


const Timbratura = (props) => {
    const { inside, outside, color } = props;
    return (
        <Grid container style={{ padding: "10px", boxShadow: "0px 0px 5px rgba(0,0,0,0.2)", marginBottom: "10px", borderRadius: "10px", backgroundColor: color ? color : "#3d046e", textAlign: "center" }}>
            <Grid item xs={12} md={6} style={{ display: "flex", flex: "start", alignItems: "center", color: "white", padding: "0px 10px", fontSize: "22px", textAlign: "center" }}>
                <div style={{ display: "flex", alignItems: "center", textAlign: "center", margin: "0 auto" }}><LoginIcon style={{ color: "#0ceba4", width: "35px", height: "35px" }} /><span style={{ padding: "10px", fontWeight: "bold" }}>{inside}</span></div>
            </Grid>
            <Grid item xs={12} md={6} style={{ display: "flex", alignItems: "center", color: "white", padding: "0px 10px", fontSize: "22px" }}>
                <div style={{ display: "flex", alignItems: "center", textAlign: "center", margin: "0 auto" }}><LogoutIcon style={{ color: "#f74d94", width: "35px", height: "35px" }} /><span style={{ padding: "10px", fontWeight: "bold" }}>{outside}</span></div>
            </Grid>
        </Grid>
    )
}



export default Adrg;