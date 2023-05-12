import React, { useState } from 'react';
import "./adrg.css";
import IconButton from '@mui/material/IconButton';
import TextField from "@mui/material/TextField";
import users from "./constant/users.json";
import { FixedSizeList } from 'react-window';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import Grid from "@mui/material/Grid";
import InputAdornment from "@mui/material/InputAdornment";
import Divider from "@mui/material/Divider";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SearchIcon from '@mui/icons-material/Search';

import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';


import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Stack from '@mui/material/Stack';
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
    const [openDays, setOpenDays] = useState(true);
    const handleChange = (event) => {
        setMonth(event.target.value);
    };


    return (
        <Grid item md={12} lg={9} className="adrg-side">
            <div className="user-data">
                <span>Matricola Name Surname</span>
            </div>
            <Grid item container className="adrg-box">
                <Grid item xs={12} md={openDays ? 12 : 4} style={openDays ? { transition: "all .5s ease-in-out" } : {}}>
                    <div className={openDays ? "day-side" : "day-side-short"}>
                        <Stack direction="row" spacing={2} style={{ width: "100%" }}>
                            <div style={{ width: "100%" }}>
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
                                    <DayList openDays={openDays} setOpenDays={setOpenDays} />
                                </div>
                            </div>
                            {!openDays &&
                                <div>
                                    <Divider orientation="vertical" >
                                        <IconButton onClick={() => { setOpenDays(true) }} style={{ backgroundColor: "#ebebeb", color: "#303030", padding: "4px" }}><KeyboardArrowRightIcon /></IconButton>
                                    </Divider>
                                </div>
                            }
                        </Stack>
                    </div>
                </Grid>

                <Grid item xs={12} md={8}>
                    <div className={openDays ? "adrg-data" : "adrg-data-open"}>
                        <AdrgData />
                    </div>
                </Grid>


            </Grid >
        </Grid >
    )
}

const DayList = ({ openDays, setOpenDays }) => {

    return (
        <List>
            {[...Array(30)].map((obj, index) => {
                return (
                    <ListItem style={{ borderBottom: "1px solid rgba(0,0,0,0.2)" }} disablePadding>
                        <ListItemButton onClick={() => { setOpenDays(false) }}>
                            <Grid container style={{ width: "100%" }}>

                                <Grid item xs={12} md={openDays ? 2 : 12} style={{ width: "100%", display: "block", textAlign: "center" }}>
                                    <span style={{ fontWeight: "bold", color: "gray", fontSize: "18px" }}>
                                        <div style={{ backgroundColor: "#043782", width: "100%", maxWidth: "100px", minWidth: "70px", height: "25px", border: "1px solid rgba(0,0,0,0.2)", borderTopLeftRadius: "10px", borderTopRightRadius: "10px", color: "white", fontSize: "12px", lineHeight: "25px", textAlign: "center", verticalAlign: "middle", alignItems: "center" }}>Day</div>

                                        <div style={{ border: "1px solid rgba(0,0,0,0.2", boxShadow: "0px 0px 2px rgba(0,0,0,0.2)", width: "100%", fontWeight: "bold", fontSize: "10px", borderBottomLeftRadius: "10px", borderBottomRightRadius: "10px", backgroundColor: "white", color: "black", textTransform: "uppercase", textAlign: "center", maxWidth: "100px", minWidth: "70px", minHeight: "50px", lineHeight: "50px", verticalAlign: "middle" }}>
                                            <span style={{ fontWeight: "bold", fontSize: "18px", color: "black" }}>{index + 1}</span></div></span>
                                </Grid>

                                {
                                    openDays ?
                                        <Grid item xs={12} md={10} style={{ textAlign: "center", width: "100%", display: "block", fontWeight: "bold", padding: "2px 20px" }}>
                                            <Grid container spacing={2}>
                                                <Grid item xs={4} style={{ width: "100%" }} >
                                                    <div style={{ padding: "10px 15px", width: "100%", fontWeight: "bold", fontSize: "10px", borderRadius: "15px", textTransform: "uppercase", textAlign: "center" }}><p style={{ width: "60%", textAlign: "center", margin: "0 auto" }}>Valore <br />del Giorno </p>
                                                        <span style={{ fontWeight: "bold", fontSize: "16px", color: "#4a4a4a" }}>8.00</span></div></Grid>
                                                <Grid item xs={4} style={{ width: "100%" }} >
                                                    <div style={{ padding: "10px 15px", width: "100%", margin: "0 auto", fontWeight: "bold", fontSize: "10px", borderRadius: "15px", textTransform: "uppercase", textAlign: "center" }}><p style={{ width: "60%", textAlign: "center", margin: "0 auto" }}>Ore <br /> Lavorate </p>
                                                        <span style={{ fontWeight: "bold", fontSize: "16px", color: "#4a4a4a" }}>8.00</span></div></Grid>
                                                <Grid item xs={4} style={{ width: "100%" }} >
                                                    <div style={{ padding: "10px 15px", width: "100%", margin: "0 auto", fontWeight: "bold", fontSize: "10px", borderRadius: "15px", textTransform: "uppercase", textAlign: "center" }}><p style={{ width: "60%", textAlign: "center", margin: "0 auto" }}>Ore <br /> Ordinarie</p>
                                                        <span style={{ fontWeight: "bold", fontSize: "16px", color: "#4a4a4a" }}>8.00</span></div></Grid>
                                            </Grid>
                                        </Grid> : ""}
                            </Grid>
                            <div style={{ width: "10%" }}>
                                {
                                    openDays ? <div style={{ width: "100% !important" }}> <span style={{ padding: "5px 0px", display: "block", color: "#0da61a", width: "100% !important", fontWeight: "bold", fontSize: "10px", borderRadius: "15px", textTransform: "uppercase", textAlign: "center" }}>Giorno Ok</span> <div style={{ margin: "0 auto", width: "20px", height: "20px", borderRadius: "100%", background: "radial-gradient(circle at 5px 5px, #56f064, #0da61a)" }}></div></div> : <div style={{ width: "20px", height: "20px", borderRadius: "100%", background: "radial-gradient(circle at 5px 5px, #56f064, #0da61a)" }}></div>
                                }

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
            <h2 style={{ fontSize: "16px", textTransform: "uppercase", color: "rgba(0,0,0,0.7)" }}>1 GENNAIO 2023</h2>
            <Grid container spacing={2}>
                <Grid item xs={12} style={{ width: "100%", minWidth: "300px" }} >
                    <div style={{ boxShadow: "0px 0px 10px rgba(0,0,0,0.2)", padding: "10px 15px", width: "100%", fontWeight: "bold", fontSize: "10px", borderRadius: "15px", backgroundColor: "#3d046e", color: "white", textTransform: "uppercase", textAlign: "center" }}><p style={{ width: "60%", textAlign: "center", margin: "0 auto" }}>Valore del Giorno </p>
                        <span style={{ fontWeight: "bold", fontSize: "28px", color: "#9ba8eb" }}>8.00</span></div></Grid>
                <Grid item md={12} lg={6} style={{ width: "100%" }} >
                    <div style={{ boxShadow: "0px 0px 10px rgba(0,0,0,0.2)", padding: "10px 15px", width: "100%", margin: "0 auto", fontWeight: "bold", fontSize: "10px", borderRadius: "15px", backgroundColor: "#3d046e", color: "white", textTransform: "uppercase", textAlign: "center" }}><p style={{ width: "60%", textAlign: "center", margin: "0 auto" }}>Ore <br /> Lavorate </p>
                        <span style={{ fontWeight: "bold", fontSize: "28px", color: "#ffffff" }}>8.00</span></div></Grid>
                <Grid item md={12} lg={6} style={{ width: "100%" }} >
                    <div style={{ boxShadow: "0px 0px 10px rgba(0,0,0,0.2)", padding: "10px 15px", width: "100%", margin: "0 auto", fontWeight: "bold", fontSize: "10px", borderRadius: "15px", backgroundColor: "#3d046e", color: "white", textTransform: "uppercase", textAlign: "center" }}><p style={{ width: "60%", textAlign: "center", margin: "0 auto" }}>Ore <br /> Ordinarie</p>
                        <span style={{ fontWeight: "bold", fontSize: "28px", color: "#ffffff" }}>8.00</span></div></Grid>
            </Grid>
            <div className={showStandard ? "adrg-today-time-show" : "adrg-today-time"}>
                <h2 style={{ fontSize: "16px", textTransform: "uppercase", color: "rgba(0,0,0,0.7)" }}>Orario</h2>
                <Timbratura inside="8.30" outside="12.30" />
                <Timbratura inside="13.30" outside="17.30" />
            </div>
            <Divider style={{ marginTop: "10px", marginBottom: "10px" }}><IconButton onClick={() => { setShowStandard(curr => !curr) }} style={{ backgroundColor: "#406ac9", color: "white", padding: "4px" }}>{showStandard ? <ExpandLessIcon /> : <ExpandMoreIcon />}</IconButton></Divider>




            <div className="adrg-timbrature">
                <h2 style={{ fontSize: "16px", textTransform: "uppercase", color: "rgba(0,0,0,0.7)" }}>Timbrature</h2>
                <Timbratura color="#01205e" inside="8.30" outside="12.40" />
                <Timbratura color="#01205e" inside="13.40" outside="17.30" />
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