import React, { useEffect, useState } from 'react';
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
import FormControlLabel from '@mui/material/FormControlLabel';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';

import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Stack from '@mui/material/Stack';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';

import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';
import DescriptionIcon from '@mui/icons-material/Description';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Paper from '@mui/material/Paper';
import Draggable from 'react-draggable';
import EditIcon from '@mui/icons-material/Edit';
import Badge from '@mui/material/Badge';

import Checkbox from '@mui/material/Checkbox';

import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import ListAltIcon from '@mui/icons-material/ListAlt';
import CalculateIcon from '@mui/icons-material/Calculate';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import CloseIcon from '@mui/icons-material/Close';
import HelpIcon from '@mui/icons-material/Help';

import DeleteIcon from '@mui/icons-material/Delete';

import Chip from '@mui/material/Chip';
import { isFocusable } from '@testing-library/user-event/dist/utils';

{/* UTILIZZABILE FINO A 1024 Pixel Width */ }

function renderRow(props) {
    const { data, index, style } = props;
    const { status, list, onClick } = data;
    const obj = list[index];
    return (
        <ListItem style={style} key={index} disablePadding>
            <ListItemButton onClick={() => { onClick(obj) }} style={{ height: "100%" }}>
                <User name={obj.name} surname={obj.surname} matricola={obj.matricola} wide={status} />
            </ListItemButton>
        </ListItem >
    );
}

function PaperComponent(props) {
    return (
        <Draggable
            handle="#draggable-dialog-title"
            cancel={'[class*="MuiDialogContent-root"]'}
        >
            <Paper {...props} />
        </Draggable>
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
    const [user, setUser] = useState(undefined);

    const onUserSelected = (obj) => {
        setUser(obj);
    }

    const ResetUser = () => {
        setUser(undefined);
    }

    return (
        <div className="adrg-container">
            <Grid container spacing={2}>
                <UserSide onUserSelected={onUserSelected} />
                <AdrgSide user={user} ResetUser={ResetUser} />
            </Grid>
        </div>
    );
};


const UserSide = ({ onUserSelected }) => {
    const [openFilters, setOpenFilters] = useState(false);
    const [chips, setChips] = useState([]);
    return (
        <Grid item md={12} lg={3} className="user-side">
            <div className="top-user-side">
                <Grid container style={{ display: "flex", alignItems: "center" }}>
                    <Grid item xs={10} md={10}><TextField variant="outlined" label="Cerca..." InputProps={{
                        endAdornment: (
                            <InputAdornment position="end"><SearchIcon /></InputAdornment>
                        )
                    }} /></Grid>
                    <Grid item xs={2} md={2} style={{ position: "relative" }}>  <IconButton onClick={() => { setOpenFilters(curr => !curr) }} title="Filtri"><FilterAltIcon /></IconButton>
                        <Filters open={openFilters} setChips={setChips} onClose={() => { setOpenFilters(false) }} chips={chips} />
                    </Grid>
                </Grid>
                <Stack direction="row" style={{ marginTop: "10px", width: "100%" }} flexWrap="wrap">
                    {chips.map((obj) => {
                        return (
                            <Chip style={{ margin: "3px" }} label={obj.label} onDelete={obj.onDelete} />
                        )
                    })}
                </Stack>
            </div >
            <div className='list-user-side'>
                <UserList onUserSelected={onUserSelected} />
            </div>
        </Grid >
    )
}

const Filters = (props) => {
    const { open, onClose, setChips, chips } = props;
    const [kut1, setKut1] = useState("");
    const [kut2, setKut2] = useState("");
    const [kut3, setKut3] = useState("");
    const [c1, setC1] = useState(false);
    const [c2, setC2] = useState(false);
    const [c3, setC3] = useState(false);

    const kut1List = {
        d1: "Dip 1",
        d2: "Dip 2",
        d3: "Dip 3"
    }
    const kut2List = {
        s1: "Sez 1",
        s2: "Sez 2",
        s3: "Sez 3"
    }
    const kut3List = {
        r1: "Role 1",
        r2: "Role 2",
        r3: "Role 3"
    }

    const GetChipsRemoved = (from) => {
        return chips.filter(obj => obj.from !== from);
    }

    useEffect(() => {
        let newChips = [];
        if (kut1)
            newChips = [...newChips, { from: "kut1", label: kut1List[kut1], onDelete: () => { setKut1("") } }];
        if (kut2)
            newChips = [...newChips, { from: "kut2", label: kut2List[kut2], onDelete: () => { setKut2("") } }];
        if (kut3)
            newChips = [...newChips, { from: "kut3", label: kut3List[kut3], onDelete: () => { setKut3("") } }];
        if (c1)
            newChips = [...newChips, { from: "c1", label: "SOLO Errori", onDelete: () => { setC1(false) } }];
        if (c2)
            newChips = [...newChips, { from: "c2", label: "Cessate", onDelete: () => { setC2(false) } }];
        if (c3)
            newChips = [...newChips, { from: "c3", label: "Tutto", onDelete: () => { setC3(false) } }];
        setChips(newChips);
    }, [kut1, kut2, kut3, c1, c2, c3])

    return (
        <div>
            {
                open && <div style={{ position: "absolute", padding: "10px 25px", boxShadow: "0px 0px 15px rgba(0,0,0,0.2)", borderRadius: "15px", width: "600px", minHeight: "200px", backgroundColor: "white", zIndex: "100" }}>
                    <div style={{ width: "100%", textAlign: "center" }}>
                        <h2 style={{ fontSize: "16px", textTransform: "uppercase", color: "rgba(0,0,0,0.8)" }}>Filtri</h2>
                    </div>
                    <Grid container style={{ width: "100%" }}>
                        <Grid item xs={12} md={4} style={{ padding: "10px" }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Kut1</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={kut1}
                                    label="Kut1"
                                    onChange={(e) => { setKut1(e.target.value) }}
                                >
                                    <MenuItem value={""} style={{ color: "rgba(0,0,0,0.4)" }}>Nessuno</MenuItem>
                                    <MenuItem value={"d1"}>Dip 1</MenuItem>
                                    <MenuItem value={"d2"}>Dip 2</MenuItem>
                                    <MenuItem value={"d3"}>Dip 3</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={4} style={{ padding: "10px" }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Kut2</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={kut2}
                                    label="Kut2"
                                    onChange={(e) => { setKut2(e.target.value) }}
                                >
                                    <MenuItem value={""} style={{ color: "rgba(0,0,0,0.4)" }}>Nessuno</MenuItem>
                                    <MenuItem value={"s1"}>Sez 1</MenuItem>
                                    <MenuItem value={"s2"}>Sez 2</MenuItem>
                                    <MenuItem value={"s3"}>Sez 3</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} md={4} style={{ padding: "10px" }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Kut3</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={kut3}
                                    label="Kut3"
                                    onChange={(e) => { setKut3(e.target.value) }}
                                >
                                    <MenuItem value={""} style={{ color: "rgba(0,0,0,0.4)" }}>Nessuno</MenuItem>
                                    <MenuItem value={"r1"}>Rol 1</MenuItem>
                                    <MenuItem value={"r2"}>Rol 2</MenuItem>
                                    <MenuItem value={"r3"}>Rol 3</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid container style={{ width: "100%" }}>
                        <Grid item xs={12} md={4} style={{ padding: "10px" }}>
                            <FormControlLabel control={<Checkbox checked={c1} onClick={() => { setC1(curr => !curr) }} />} label="Mostra SOLO Errori" />
                        </Grid>
                        <Grid item xs={12} md={4} style={{ padding: "10px" }}>
                            <FormControlLabel control={<Checkbox checked={c2} onClick={() => { setC2(curr => !curr) }} />} label="Mostra Cessate" />
                        </Grid>
                        <Grid item xs={12} md={4} style={{ padding: "10px" }}>
                            <FormControlLabel control={<Checkbox checked={c3} onClick={() => { setC3(curr => !curr) }} />} label="Mostra Tutto" />
                        </Grid>
                    </Grid>
                    <div style={{ float: "right" }}>
                        <Button onClick={() => { onClose() }}>Chiudi</Button>
                    </div>
                </div>
            }
        </div >
    )
}

const UserList = ({ onUserSelected }) => {

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
                itemData={{ onClick: onUserSelected, list: users }}
            >
                {renderRow}
            </FixedSizeList>
        </div>

    )
}


const AdrgSide = ({ user, ResetUser }) => {

    const months = ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno"];
    const year = 2023;
    const [month, setMonth] = useState(0);
    const [openDays, setOpenDays] = useState(true);
    const [selected, setSelected] = useState(-1);
    const [openHelp, setOpenHelp] = useState(false);

    const handleChange = (event) => {
        setMonth(event.target.value);
    };

    useEffect(() => {
        setOpenDays(true);
    }, [user])

    return (
        <Grid item md={12} lg={9} className="adrg-side">
            {
                user &&
                <div style={{ position: "relative" }}>
                    < div className="user-data" >
                        <span> {user.matricola} <span style={{ color: "rgba(0,0,0,0.8)" }}> {user.name} {user.surname}</span> </span>
                    </div >
                    <div style={{ position: "absolute", right: "10px", top: "30px" }}><IconButton onClick={() => { ResetUser() }}><CloseIcon style={{ width: "30px", height: "30px", color: "rgb(61, 4, 110)" }} /></IconButton></div>
                    <div style={{ position: "absolute", left: "10px", top: "30px" }}><IconButton onClick={() => { setOpenHelp(true) }} title="Help"><HelpIcon style={{ width: "30px", height: "30px", color: "#2b2b2b" }} /></IconButton></div>
                    <Grid item container className="adrg-box">
                        <Grid item xs={12} md={openDays ? 12 : 4} style={openDays ? { transition: "all .5s ease-in-out" } : {}}>
                            <div className={openDays ? "day-side" : "day-side-short"}>
                                <Stack direction="row" spacing={2} style={{ width: "100%" }}>
                                    <div style={{ width: "100%" }}>
                                        <div className="month-select-day-side">
                                            <FormControl fullWidth>
                                                <InputLabel id="demo-simple-select-label">Mese</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    value={month}
                                                    label="Mese"
                                                    onChange={handleChange}
                                                >
                                                    {months.map((m, index) => {
                                                        return (
                                                            <MenuItem value={index} key={index}>{m}</MenuItem>
                                                        )
                                                    })}
                                                </Select>
                                            </FormControl>
                                        </div>
                                        <div className="day-select-day-side">
                                            <DayList month={month} year={year} openDays={openDays} setOpenDays={setOpenDays} selected={selected} setSelected={setSelected} />
                                        </div>
                                    </div>
                                    {!openDays &&
                                        <div style={{ marginLeft: "0px !important" }}>
                                            <Divider orientation="vertical" style={{ marginLeft: "0px !important", height: "100%", paddingRight: "0px", paddingLeft: "0px" }} >
                                                <IconButton onClick={() => { setOpenDays(true) }} style={{ backgroundColor: "#ebebeb", color: "#303030", padding: "4px" }}><KeyboardArrowRightIcon /></IconButton>
                                            </Divider>
                                        </div>
                                    }
                                </Stack>
                            </div>
                        </Grid>

                        <Grid item xs={12} md={8}>
                            <div className={openDays ? "adrg-data" : "adrg-data-open"}>
                                <AdrgData selected={selected} day={selected + 1} month={months[month]} year={year} />
                            </div>
                        </Grid>


                    </Grid >
                </div>
            }
            <HelpDialog open={openHelp} handleClose={() => { setOpenHelp(false) }} />
        </Grid>



    )
}


const HelpDialog = (props) => {

    const { handleClose, open } = props;

    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
        >
            <DialogTitle>Istruzioni Utilizzo</DialogTitle>
            <DialogContent>
                <Divider style={{ margin: "10px 0px", fontSize: "14px", textTransform: "uppercase" }}>/// Lista Giorni ///</Divider>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eu turpis egestas pretium aenean pharetra magna ac placerat vestibulum. Praesent tristique magna sit amet purus. Massa id neque aliquam vestibulum morbi. At risus viverra adipiscing at in. Sed turpis tincidunt id aliquet risus feugiat in ante metus. Malesuada pellentesque elit eget gravida cum. Ac auctor augue mauris augue. Pellentesque habitant morbi tristique senectus et. Pellentesque adipiscing commodo elit at imperdiet dui accumsan sit amet. Adipiscing enim eu turpis egestas pretium aenean pharetra. Tortor aliquam nulla facilisi cras fermentum odio eu feugiat pretium.

                    Imperdiet nulla malesuada pellentesque elit eget gravida cum sociis. Eu turpis egestas pretium aenean. Nibh cras pulvinar mattis nunc sed blandit libero. Faucibus vitae aliquet nec ullamcorper sit. Condimentum mattis pellentesque id nibh tortor id aliquet lectus proin. Amet facilisis magna etiam tempor. Arcu cursus euismod quis viverra nibh cras. Consequat nisl vel pretium lectus quam id leo in. Sed ullamcorper morbi tincidunt ornare massa eget. Vitae semper quis lectus nulla. Aliquam malesuada bibendum arcu vitae elementum curabitur vitae. Risus viverra adipiscing at in tellus integer feugiat. Dui id ornare arcu odio ut sem nulla pharetra diam.

                    Id aliquet risus feugiat in. Non enim praesent elementum facilisis leo vel fringilla est. Lorem ipsum dolor sit amet consectetur adipiscing. Parturient montes nascetur ridiculus mus. Sed ullamcorper morbi tincidunt ornare massa. Mattis vulputate enim nulla aliquet porttitor lacus. Lacus sed viverra tellus in hac habitasse platea. Et tortor consequat id porta nibh venenatis cras. Lacus vestibulum sed arcu non odio euismod lacinia at quis. Nisi scelerisque eu ultrices vitae auctor eu. Turpis nunc eget lorem dolor sed viverra ipsum nunc. Porttitor rhoncus dolor purus non. In ante metus dictum at.
                </p>
                <Divider style={{ margin: "10px 0px", fontSize: "14px", textTransform: "uppercase" }}>/// Interfaccia Base ///</Divider>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eu turpis egestas pretium aenean pharetra magna ac placerat vestibulum. Praesent tristique magna sit amet purus. Massa id neque aliquam vestibulum morbi. At risus viverra adipiscing at in. Sed turpis tincidunt id aliquet risus feugiat in ante metus. Malesuada pellentesque elit eget gravida cum. Ac auctor augue mauris augue. Pellentesque habitant morbi tristique senectus et. Pellentesque adipiscing commodo elit at imperdiet dui accumsan sit amet. Adipiscing enim eu turpis egestas pretium aenean pharetra. Tortor aliquam nulla facilisi cras fermentum odio eu feugiat pretium.

                    Imperdiet nulla malesuada pellentesque elit eget gravida cum sociis. Eu turpis egestas pretium aenean. Nibh cras pulvinar mattis nunc sed blandit libero. Faucibus vitae aliquet nec ullamcorper sit. Condimentum mattis pellentesque id nibh tortor id aliquet lectus proin. Amet facilisis magna etiam tempor. Arcu cursus euismod quis viverra nibh cras. Consequat nisl vel pretium lectus quam id leo in. Sed ullamcorper morbi tincidunt ornare massa eget. Vitae semper quis lectus nulla. Aliquam malesuada bibendum arcu vitae elementum curabitur vitae. Risus viverra adipiscing at in tellus integer feugiat. Dui id ornare arcu odio ut sem nulla pharetra diam.

                    Id aliquet risus feugiat in. Non enim praesent elementum facilisis leo vel fringilla est. Lorem ipsum dolor sit amet consectetur adipiscing. Parturient montes nascetur ridiculus mus. Sed ullamcorper morbi tincidunt ornare massa. Mattis vulputate enim nulla aliquet porttitor lacus. Lacus sed viverra tellus in hac habitasse platea. Et tortor consequat id porta nibh venenatis cras. Lacus vestibulum sed arcu non odio euismod lacinia at quis. Nisi scelerisque eu ultrices vitae auctor eu. Turpis nunc eget lorem dolor sed viverra ipsum nunc. Porttitor rhoncus dolor purus non. In ante metus dictum at.
                </p>
                <Divider style={{ margin: "10px 0px", fontSize: "14px", textTransform: "uppercase" }}>/// Gestione Timbri ///</Divider>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eu turpis egestas pretium aenean pharetra magna ac placerat vestibulum. Praesent tristique magna sit amet purus. Massa id neque aliquam vestibulum morbi. At risus viverra adipiscing at in. Sed turpis tincidunt id aliquet risus feugiat in ante metus. Malesuada pellentesque elit eget gravida cum. Ac auctor augue mauris augue. Pellentesque habitant morbi tristique senectus et. Pellentesque adipiscing commodo elit at imperdiet dui accumsan sit amet. Adipiscing enim eu turpis egestas pretium aenean pharetra. Tortor aliquam nulla facilisi cras fermentum odio eu feugiat pretium.

                    Imperdiet nulla malesuada pellentesque elit eget gravida cum sociis. Eu turpis egestas pretium aenean. Nibh cras pulvinar mattis nunc sed blandit libero. Faucibus vitae aliquet nec ullamcorper sit. Condimentum mattis pellentesque id nibh tortor id aliquet lectus proin. Amet facilisis magna etiam tempor. Arcu cursus euismod quis viverra nibh cras. Consequat nisl vel pretium lectus quam id leo in. Sed ullamcorper morbi tincidunt ornare massa eget. Vitae semper quis lectus nulla. Aliquam malesuada bibendum arcu vitae elementum curabitur vitae. Risus viverra adipiscing at in tellus integer feugiat. Dui id ornare arcu odio ut sem nulla pharetra diam.

                    Id aliquet risus feugiat in. Non enim praesent elementum facilisis leo vel fringilla est. Lorem ipsum dolor sit amet consectetur adipiscing. Parturient montes nascetur ridiculus mus. Sed ullamcorper morbi tincidunt ornare massa. Mattis vulputate enim nulla aliquet porttitor lacus. Lacus sed viverra tellus in hac habitasse platea. Et tortor consequat id porta nibh venenatis cras. Lacus vestibulum sed arcu non odio euismod lacinia at quis. Nisi scelerisque eu ultrices vitae auctor eu. Turpis nunc eget lorem dolor sed viverra ipsum nunc. Porttitor rhoncus dolor purus non. In ante metus dictum at.
                </p>
                <Divider style={{ margin: "10px 0px", fontSize: "14px", textTransform: "uppercase" }}>/// Modifica Informazioni ///</Divider>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eu turpis egestas pretium aenean pharetra magna ac placerat vestibulum. Praesent tristique magna sit amet purus. Massa id neque aliquam vestibulum morbi. At risus viverra adipiscing at in. Sed turpis tincidunt id aliquet risus feugiat in ante metus. Malesuada pellentesque elit eget gravida cum. Ac auctor augue mauris augue. Pellentesque habitant morbi tristique senectus et. Pellentesque adipiscing commodo elit at imperdiet dui accumsan sit amet. Adipiscing enim eu turpis egestas pretium aenean pharetra. Tortor aliquam nulla facilisi cras fermentum odio eu feugiat pretium.

                    Imperdiet nulla malesuada pellentesque elit eget gravida cum sociis. Eu turpis egestas pretium aenean. Nibh cras pulvinar mattis nunc sed blandit libero. Faucibus vitae aliquet nec ullamcorper sit. Condimentum mattis pellentesque id nibh tortor id aliquet lectus proin. Amet facilisis magna etiam tempor. Arcu cursus euismod quis viverra nibh cras. Consequat nisl vel pretium lectus quam id leo in. Sed ullamcorper morbi tincidunt ornare massa eget. Vitae semper quis lectus nulla. Aliquam malesuada bibendum arcu vitae elementum curabitur vitae. Risus viverra adipiscing at in tellus integer feugiat. Dui id ornare arcu odio ut sem nulla pharetra diam.

                    Id aliquet risus feugiat in. Non enim praesent elementum facilisis leo vel fringilla est. Lorem ipsum dolor sit amet consectetur adipiscing. Parturient montes nascetur ridiculus mus. Sed ullamcorper morbi tincidunt ornare massa. Mattis vulputate enim nulla aliquet porttitor lacus. Lacus sed viverra tellus in hac habitasse platea. Et tortor consequat id porta nibh venenatis cras. Lacus vestibulum sed arcu non odio euismod lacinia at quis. Nisi scelerisque eu ultrices vitae auctor eu. Turpis nunc eget lorem dolor sed viverra ipsum nunc. Porttitor rhoncus dolor purus non. In ante metus dictum at.
                </p>
                <Divider style={{ margin: "10px 0px", fontSize: "14px", textTransform: "uppercase" }}>/// Calcolo e Pulizia ///</Divider>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eu turpis egestas pretium aenean pharetra magna ac placerat vestibulum. Praesent tristique magna sit amet purus. Massa id neque aliquam vestibulum morbi. At risus viverra adipiscing at in. Sed turpis tincidunt id aliquet risus feugiat in ante metus. Malesuada pellentesque elit eget gravida cum. Ac auctor augue mauris augue. Pellentesque habitant morbi tristique senectus et. Pellentesque adipiscing commodo elit at imperdiet dui accumsan sit amet. Adipiscing enim eu turpis egestas pretium aenean pharetra. Tortor aliquam nulla facilisi cras fermentum odio eu feugiat pretium.

                    Imperdiet nulla malesuada pellentesque elit eget gravida cum sociis. Eu turpis egestas pretium aenean. Nibh cras pulvinar mattis nunc sed blandit libero. Faucibus vitae aliquet nec ullamcorper sit. Condimentum mattis pellentesque id nibh tortor id aliquet lectus proin. Amet facilisis magna etiam tempor. Arcu cursus euismod quis viverra nibh cras. Consequat nisl vel pretium lectus quam id leo in. Sed ullamcorper morbi tincidunt ornare massa eget. Vitae semper quis lectus nulla. Aliquam malesuada bibendum arcu vitae elementum curabitur vitae. Risus viverra adipiscing at in tellus integer feugiat. Dui id ornare arcu odio ut sem nulla pharetra diam.

                    Id aliquet risus feugiat in. Non enim praesent elementum facilisis leo vel fringilla est. Lorem ipsum dolor sit amet consectetur adipiscing. Parturient montes nascetur ridiculus mus. Sed ullamcorper morbi tincidunt ornare massa. Mattis vulputate enim nulla aliquet porttitor lacus. Lacus sed viverra tellus in hac habitasse platea. Et tortor consequat id porta nibh venenatis cras. Lacus vestibulum sed arcu non odio euismod lacinia at quis. Nisi scelerisque eu ultrices vitae auctor eu. Turpis nunc eget lorem dolor sed viverra ipsum nunc. Porttitor rhoncus dolor purus non. In ante metus dictum at.
                </p>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Chiudi</Button>
            </DialogActions>
        </Dialog>
    )
}



const DayList = ({ openDays, setOpenDays, selected, setSelected, month, year }) => {


    useEffect(() => {
        if (openDays) {
            setSelected(-1);
        }
    }, [openDays]);

    return (
        <List style={{ padding: "10px" }}>
            {[...Array(30)].map((obj, index) => {
                let day = new Date(index, month, year);
                let status = Math.floor(Math.random() * 3);
                let sText;
                let sColorPrimary;
                let sColorSecondary;
                switch (status) {
                    case 0:
                        sText = "Giorno Ok"
                        sColorPrimary = "#0da61a";
                        sColorSecondary = " #56f064";
                        break;
                    case 1:
                        sText = "Giorno Warning";
                        sColorPrimary = "#f2be02";
                        sColorSecondary = "#fff530";
                        break;
                    case 2:
                        sText = "Giorno Error";
                        sColorPrimary = "#c20205";
                        sColorSecondary = "#ff5c5e";
                        break;

                }
                day = day.getDay();
                switch (day) {
                    case 0:
                        day = "Domenica";
                        break;
                    case 1:
                        day = "Lunedì";
                        break;
                    case 2:
                        day = "Martedì";
                        break;
                    case 3:
                        day = "Mercoledì";
                        break;
                    case 4:
                        day = "Giovedì";
                        break;
                    case 5:
                        day = "Venerdì";
                        break;
                    case 6:
                        day = "Sabato";
                        break;
                    default: break;
                }
                return (
                    <ListItem key={index} style={{ borderBottom: "1px solid rgba(0,0,0,0.2)", backgroundColor: index === selected ? "#172d75" : "white" }} disablePadding >
                        <ListItemButton onClick={() => { setOpenDays(false); setSelected(index); }}>
                            <Grid container style={{ width: "100%" }}>

                                <Grid item xs={12} md={openDays ? 2 : 6} style={{ width: "100%", display: "block", textAlign: "center" }}>
                                    <span style={{ fontWeight: "bold", color: "gray", fontSize: "18px" }}>
                                        <div style={{ margin: "0 auto", backgroundColor: "#043782", width: "100%", maxWidth: "100px", height: "25px", border: "1px solid rgba(0,0,0,0.2)", borderTopLeftRadius: "10px", borderTopRightRadius: "10px", color: "white", fontSize: "12px", lineHeight: "25px", textAlign: "center", verticalAlign: "middle", alignItems: "center" }}>{day}</div>

                                        <div style={{ margin: "0 auto", border: "1px solid rgba(0,0,0,0.2", boxShadow: "0px 0px 2px rgba(0,0,0,0.2)", width: "100%", maxWidth: "100px", fontWeight: "bold", fontSize: "10px", borderBottomLeftRadius: "10px", borderBottomRightRadius: "10px", backgroundColor: "white", color: "black", textTransform: "uppercase", textAlign: "center", minHeight: "50px", lineHeight: "50px", verticalAlign: "middle" }}>
                                            <span style={{ fontWeight: "bold", fontSize: "18px", color: "black" }}>{index + 1}</span></div></span>
                                </Grid>

                                {
                                    openDays ?
                                        <Grid item xs={12} md={8} style={{ textAlign: "center", width: "100%", display: "block", fontWeight: "bold", padding: "2px 20px" }}>
                                            <Grid container>
                                                <Grid item xs={12} sm={4} style={{ width: "100%", padding: "10px" }} >
                                                    <div style={{ width: "100%", fontWeight: "bold", fontSize: "10px", borderRadius: "15px", textTransform: "uppercase", textAlign: "center" }}><p style={{ width: "60%", textAlign: "center", margin: "0 auto" }}>Valore <br />del Giorno </p>
                                                        <span style={{ fontWeight: "bold", fontSize: "16px", color: "#4a4a4a" }}>8.00</span></div></Grid>
                                                <Grid item xs={12} sm={4} style={{ width: "100%", padding: "10px" }} >
                                                    <div style={{ width: "100%", margin: "0 auto", fontWeight: "bold", fontSize: "10px", borderRadius: "15px", textTransform: "uppercase", textAlign: "center" }}><p style={{ width: "60%", textAlign: "center", margin: "0 auto" }}>Ore <br /> Lavorate </p>
                                                        <span style={{ fontWeight: "bold", fontSize: "16px", color: "#4a4a4a" }}>8.00</span></div></Grid>
                                                <Grid item xs={12} sm={4} style={{ width: "100%", padding: "10px" }} >
                                                    <div style={{ width: "100%", margin: "0 auto", fontWeight: "bold", fontSize: "10px", borderRadius: "15px", textTransform: "uppercase", textAlign: "center" }}><p style={{ width: "60%", textAlign: "center", margin: "0 auto" }}>Ore <br /> Ordinarie</p>
                                                        <span style={{ fontWeight: "bold", fontSize: "16px", color: "#4a4a4a" }}>8.00</span></div></Grid>
                                            </Grid>
                                        </Grid> : ""}
                                <Grid item xs={12} md={openDays ? 2 : 6} style={{ position: "relative" }}>
                                    {
                                        openDays ?
                                            <div style={{ width: "100% !important", margin: "0 auto", position: "relative" }}>
                                                <span
                                                    style={
                                                        {
                                                            padding: "5px 0px",
                                                            display: "block",
                                                            color: sColorPrimary,
                                                            width: "100% !important",
                                                            fontWeight: "bold",
                                                            fontSize: "10px",
                                                            borderRadius: "15px",
                                                            textTransform: "uppercase",
                                                            textAlign: "center"
                                                        }}>
                                                    {sText}
                                                </span>
                                                <div
                                                    style={{
                                                        margin: "0 auto",
                                                        width: "20px",
                                                        height: "20px",
                                                        borderRadius: "100%",
                                                        background: "radial-gradient(circle at 5px 5px," + sColorSecondary + "," + sColorPrimary + ")"
                                                    }}></div>
                                            </div> :

                                            <div>
                                                <span style={{ display: "block", padding: "5px 0px", color: sColorPrimary, width: "100% !important", fontWeight: "bold", fontSize: "10px", borderRadius: "15px", textTransform: "uppercase", textAlign: "center !important" }}>{sText}</span>
                                                <div style={{ position: "absolute", top: "40%", left: "50%", trasnform: "translate(-50%,-50%)", width: "15px", height: "15px", borderRadius: "100%", background: "radial-gradient(circle at 5px 5px," + sColorSecondary + "," + sColorPrimary + ")" }}></div>

                                            </div>



                                    }

                                </Grid>
                            </Grid>

                        </ListItemButton>
                    </ListItem>
                )
            })}
        </List >
    )
}

const AdrgData = ({ selected, day, month, year }) => {

    const [showStandard, setShowStandard] = useState(false);
    const [showHCode, setShowHCode] = useState(false);
    const [showBCCode, setShowBCCode] = useState(false);
    const [showFCode, setShowFCode] = useState(false);
    const [editObj, setEditObj] = useState({});
    const [deleteObj, setDeleteObj] = useState({});
    const [editInfoObj, setEditInfoObj] = useState({});
    const [open, setOpen] = useState(false);
    const [openInfo, setOpenInfo] = useState(false);
    const [openTotal, setOpenTotal] = useState(false);
    const [openCausal, setOpenCausal] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [causalObj, setCausalObj] = useState({});
    const [totalObj, setTotalObj] = useState({});

    useEffect(() => {
        setShowStandard(false);
        setEditObj({});
        setOpen(false);
        setOpenInfo(false);
        setOpenTotal(false);
        setOpenCausal(false);
        setCausalObj({});
        setTotalObj({});
    }, [selected])
    return (
        <div style={{ width: "90%", margin: "0 auto", position: "relative" }}>

            <div style={{ position: "absolute", left: "0", top: "-8px" }}>
                <IconButton style={{ backgroundColor: "#010b7a", color: "white", padding: "7px", margin: "0px 5px" }} title="Calcolo"><CalculateIcon /></IconButton> {/*Calcola*/}
                <IconButton style={{ backgroundColor: "#c20817", color: "white", padding: "7px", margin: "0px 5px" }} title="Pulisci"><HighlightOffIcon /></IconButton> {/*Pulisci*/}
            </div>
            <div style={{ position: "absolute", right: "0", top: "-8px" }}>
                <IconButton style={{ backgroundColor: "#3d046e", color: "white", padding: "7px", margin: "0px 5px" }} onClick={() => { setOpenTotal(true) }} title="Totali"><ListAltIcon /></IconButton>
                {/*Totali*/}
            </div>
            <h2 style={{ fontSize: "18px", textTransform: "uppercase", color: "rgba(0,0,0,0.7)" }}>{day} {month} {year}</h2>
            <Divider style={{ margin: "10px 0px" }}></Divider>

            <div style={{ position: "absolute", right: "0", top: "50px" }}><IconButton style={{ color: "#212121" }} onClick={() => { setOpenInfo(true) }} title="Modifica Informazioni"><EditIcon /></IconButton></div>
            <h2 style={{ fontSize: "16px", textTransform: "uppercase", color: "rgba(0,0,0,0.7)", marginBottom: "20px" }}>Informazioni</h2>
            <Grid container spacing={2} style={{ marginBottom: "20px" }}>
                <Grid item xs={12} style={{ width: "100F%" }} >
                    <div style={{ boxShadow: "0px 0px 6px rgba(0,0,0,0.2)", padding: "10px 15px", width: "100%", fontWeight: "bold", fontSize: "10px", borderRadius: "15px", textTransform: "uppercase", textAlign: "center" }}><p style={{ width: "60%", textAlign: "center", margin: "0 auto", color: "#4f4f4f" }}>BADGE </p>
                        <span style={{ fontWeight: "bold", fontSize: "18px", color: "#4c0387" }}>1510010807</span></div></Grid>
                <Grid item md={12} lg={6} style={{ width: "100%" }} >
                    <div style={{ position: "relative", boxShadow: "0px 0px 6px rgba(0,0,0,0.2)", padding: "10px 15px", width: "100%", margin: "0 auto", fontWeight: "bold", fontSize: "10px", borderRadius: "15px", textTransform: "uppercase", textAlign: "center" }}><p style={{ width: "60%", textAlign: "center", margin: "0 auto", color: "#4f4f4f" }}>Casi Speciali </p>
                        <span style={{ display: "block", margin: "0 auto", fontWeight: "bold", fontSize: "16px", textTransform: "none", color: "black", maxWidth: "60%", overflowWrap: "break-word" }}>{showBCCode ? "A" : "Blocco Compensazioni"}</span>
                        <CodeOrDescription show={showBCCode} callbackFunction={() => { setShowBCCode(curr => !curr) }} />
                    </div></Grid>
                <Grid item md={12} lg={6} style={{ width: "100%" }} >
                    <div style={{ position: "relative", boxShadow: "0px 0px 6px rgba(0,0,0,0.2)", padding: "10px 15px", width: "100%", margin: "0 auto", fontWeight: "bold", fontSize: "10px", borderRadius: "15px", textTransform: "uppercase", textAlign: "center" }}><p style={{ width: "60%", textAlign: "center", margin: "0 auto", color: "#4f4f4f" }}>Festività</p>
                        <span style={{ display: "block", margin: "0 auto", fontWeight: "bold", fontSize: "16px", textTransform: "none", color: "black", maxWidth: "60%", overflowWrap: "break-word" }}>{showFCode ? "F" : "Festività (Netram)"}</span>
                        <CodeOrDescription show={showFCode} callbackFunction={() => { setShowFCode(curr => !curr) }} />
                    </div></Grid>
            </Grid>


            <Grid container spacing={2}>
                <Grid item xs={12} md={4} style={{ width: "100%" }} >
                    <div style={{ boxShadow: "0px 0px 10px rgba(0,0,0,0.2)", padding: "10px 15px", width: "100%", fontWeight: "bold", fontSize: "10px", borderRadius: "15px", backgroundColor: "#3d046e", color: "white", textTransform: "uppercase", textAlign: "center" }}><p style={{ width: "60%", textAlign: "center", margin: "0 auto" }}>Valore <br /> del Giorno </p>
                        <span style={{ fontWeight: "bold", fontSize: "28px", color: "#9ba8eb" }}>8.00</span></div></Grid>
                <Grid item sm={12} md={4} style={{ width: "100%" }} >
                    <div style={{ boxShadow: "0px 0px 10px rgba(0,0,0,0.2)", padding: "10px 15px", width: "100%", margin: "0 auto", fontWeight: "bold", fontSize: "10px", borderRadius: "15px", backgroundColor: "#3d046e", color: "white", textTransform: "uppercase", textAlign: "center" }}><p style={{ width: "60%", textAlign: "center", margin: "0 auto" }}>Ore <br /> Lavorate </p>
                        <span style={{ fontWeight: "bold", fontSize: "28px", color: "#ffffff" }}>8.00</span></div></Grid>
                <Grid item sm={12} md={4} style={{ width: "100%" }} >
                    <div style={{ boxShadow: "0px 0px 10px rgba(0,0,0,0.2)", padding: "10px 15px", width: "100%", margin: "0 auto", fontWeight: "bold", fontSize: "10px", borderRadius: "15px", backgroundColor: "#3d046e", color: "white", textTransform: "uppercase", textAlign: "center" }}><p style={{ width: "60%", textAlign: "center", margin: "0 auto" }}>Ore <br /> Ordinarie</p>
                        <span style={{ fontWeight: "bold", fontSize: "28px", color: "#ffffff" }}>8.00</span></div></Grid>
            </Grid>
            <div className={showStandard ? "adrg-today-time-show" : "adrg-today-time"}>
                <h2 style={{ fontSize: "16px", textTransform: "uppercase", color: "rgba(0,0,0,0.7)" }}>Orario</h2>
                <div
                    style={{ position: "relative", border: "1px solid rgba(0,0,0,0.2)", marginBottom: "10px", borderRadius: "10px", padding: "10px", fontWeight: "bold", fontSize: "18px", boxShadow: "0px 0px 5px rgba(0,0,0,0.2)" }}
                >
                    {showHCode ? "0132" : "Ram Int Mezz'ora"}
                    <CodeOrDescription show={showHCode} callbackFunction={() => { setShowHCode(curr => !curr) }} />
                </div>
                <Timbratura inside="8.30" outside="12.30" />
                <Timbratura inside="13.30" outside="17.30" />
            </div>
            <Divider style={{ marginTop: "10px", marginBottom: "10px", position: "relative" }}>{!showStandard ? <div style={{ padding: "5px", position: "absolute", top: "-30px", left: "50%", transform: "translateX(-50%)" }}><span style={{ fontWeight: "bold", textTransform: "uppercase", color: "gray", fontSize: "10px" }}>Mostra Orario</span></div> : ""}<IconButton onClick={() => { setShowStandard(curr => !curr) }} style={{ backgroundColor: "#406ac9", color: "white", padding: "4px" }}>{showStandard ? <ExpandLessIcon /> : <ExpandMoreIcon />}</IconButton></Divider>




            <div className="adrg-timbrature">
                <h2 style={{ fontSize: "16px", textTransform: "uppercase", color: "rgba(0,0,0,0.7)" }}>Timbrature</h2>

                <div style={{ position: "absolute", right: "0", top: "-8px" }}><IconButton style={{ boxShadow: "0px 0px 10px rgba(0,0,0,0.2)", color: "white", backgroundColor: "rgb(64, 106, 201)", padding: "5px" }} onClick={() => { setOpen(true) }}><AddIcon /></IconButton></div>
                <div style={{ position: "absolute", left: "0", top: "-8px" }}><IconButton style={{ boxShadow: "0px 0px 10px rgba(0,0,0,0.2)", color: "rgb(1, 32, 94)", border: "1px solid rgb(1, 32, 94)", padding: "5px" }} onClick={() => { setOpenCausal(true) }}>  <Badge badgeContent={2} color="primary"><PlaylistAddCheckIcon /></Badge></IconButton></div>
                <div style={{ display: "flex", width: "100%" }}>
                    <Timbratura onClick={() => { setEditObj({ inside: "8.30", outside: "12.40" }); setOpen(true); }} style={{ cursor: "pointer" }} color="#01205e" inside="8.30" outside="12.40" />
                    <IconButton onClick={() => { setDeleteObj({ inside: "8.30", outside: "12.40" }); setOpenDelete(true); }} style={{ width: "30px", height: "30px", margin: "10px", marginTop: "20px" }}><DeleteIcon /></IconButton>
                </div>
                <div style={{ display: "flex", width: "100%" }}>
                    <Timbratura onClick={() => { setEditObj({ inside: "13.40", outside: "17.40" }); setOpen(true); }} style={{ cursor: "pointer" }} color="#01205e" inside="13.40" outside="17.30" />
                    <IconButton onClick={() => { setDeleteObj({ inside: "13.40", outside: "17.40" }); setOpenDelete(true); }} style={{ width: "30px", height: "30px", margin: "10px", marginTop: "20px" }}><DeleteIcon /></IconButton>
                </div>
                <div style={{ display: "flex", width: "100%" }}>
                    <Timbratura onClick={() => { setEditObj({ inside: "13.40", outside: "17.40" }); setOpen(true); }} style={{ cursor: "pointer" }} color="#01205e" inside="13.40" outside="17.30" />
                    <IconButton onClick={() => { setDeleteObj({ inside: "13.40", outside: "17.40" }); setOpenDelete(true); }} style={{ width: "30px", height: "30px", margin: "10px", marginTop: "20px" }}><DeleteIcon /></IconButton>
                </div>
            </div>
            <InfoDialog open={openInfo} handleClose={() => { setOpenInfo(false) }} obj={editInfoObj} />
            <TimbroDialog open={open} handleClose={() => { setEditObj(undefined); setOpen(false); }} obj={editObj} />
            <TotalDialog open={openTotal} handleClose={() => { setOpenTotal(false) }} obj={totalObj} />
            <CausalDialog open={openCausal} handleClose={() => { setOpenCausal(false) }} obj={causalObj} />
            <DeleteDialog open={openDelete} handleClose={() => { setOpenDelete(false) }} obj={deleteObj} />
        </div >
    )
}

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


const DeleteDialog = (props) => {

    const { obj, handleClose, handleSave, open } = props;
    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
        >
            <DialogTitle>Conferma Eliminazione</DialogTitle>
            <DialogContent>
                <p>Sicuro di voler eliminare la Timbratura </p>
                <Timbratura color="#01205e" inside={obj && obj.inside} outside={obj && obj.outside} />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Annulla</Button>
                <Button onClick={handleClose}>Conferma</Button>
            </DialogActions>
        </Dialog>
    )
}

const InfoDialog = (props) => {

    const { obj, handleClose, handleSave, open } = props;

    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-labelledby="draggable-dialog-title"
            PaperProps={{ sx: { position: "fixed", top: 10, left: "20%", m: 0 } }}
        >
            <DialogTitle style={{ cursor: 'move' }}>Modifica Informazioni</DialogTitle>
            <DialogContent>
                <Divider style={{ margin: "10px 0px", fontSize: "14px", textTransform: "uppercase" }}>/// Eccezioni ///</Divider>
                <Grid container>
                    <Grid item xs={12} md={6} style={{ padding: "5px" }}>
                        <TextField fullWidth label="Casi Speciali" value={obj.inside ? obj.inside : ""} />
                    </Grid>
                    <Grid item xs={12} md={6} style={{ padding: "5px" }}>
                        <TextField fullWidth label="Festività"></TextField>
                    </Grid>
                </Grid>
                <Divider style={{ margin: "10px 0px", fontSize: "14px", textTransform: "uppercase" }}>/// Orario ///</Divider>
                <Grid container>
                    <Grid item xs={12} md={6} style={{ padding: "5px" }}>
                        <TextField fullWidth label="Ore Lavorate" value={obj.outside ? obj.outside : ""} />
                    </Grid>
                    <Grid item xs={12} md={6} style={{ padding: "5px" }}>
                        <TextField fullWidth label="Ore Ordinarie"></TextField>
                    </Grid>
                    <Grid item xs={12} style={{ padding: "5px" }}>
                        <TextField fullWidth label="Orario"></TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <h2>Preview Orario</h2>
                        <Timbratura style={{ backgroundColor: "rgb(61, 4, 110)", color: "white" }} inside="8.30" outside="12.30" />
                        <Timbratura style={{ backgroundColor: "rgb(61, 4, 110)", color: "white" }} inside="13.30" outside="17.30" />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Annulla</Button>
                <Button onClick={handleClose}>Salva</Button>
            </DialogActions>
        </Dialog>
    )
}

const TimbroDialog = (props) => {

    const { obj, handleClose, handleSave, open } = props;
    const [curr, setCurr] = useState({ ...obj });

    useEffect(() => {
        setCurr({ ...obj });
    }, [obj])
    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle>{obj === undefined ? "Aggiungi Timbro" : "Modifica Timbro"}</DialogTitle>
            <DialogContent>
                <Divider style={{ margin: "10px 0px", fontSize: "14px", textTransform: "uppercase" }}>/// Entrata ///</Divider>
                <Grid container>
                    <Grid item xs={12} md={4} style={{ padding: "5px" }}>
                        <TextField label="Entrata" value={curr.inside ? curr.inside : ""} />
                    </Grid>
                    <Grid item xs={12} md={4} style={{ padding: "5px" }}>
                        <TextField label="Causale"></TextField>
                    </Grid>
                    <Grid item xs={12} md={4} style={{ padding: "5px" }}>
                        <TextField label="Terminale"></TextField>
                    </Grid>
                </Grid>
                <Divider style={{ margin: "10px 0px", fontSize: "14px", textTransform: "uppercase" }}>\\\ Uscita \\\</Divider>
                <Grid container>
                    <Grid item xs={12} md={4} style={{ padding: "5px" }}>
                        <TextField label="Uscita" value={curr.outside ? curr.outside : ""} />
                    </Grid>
                    <Grid item xs={12} md={4} style={{ padding: "5px" }}>
                        <TextField label="Causale"></TextField>
                    </Grid>
                    <Grid item xs={12} md={4} style={{ padding: "5px" }}>
                        <TextField label="Terminale"></TextField>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Annulla</Button>
                <Button onClick={handleClose}>Salva</Button>
            </DialogActions>
        </Dialog>
    )
}


const TotalDialog = (props) => {

    const { obj, handleClose, handleSave, open } = props;
    const [totals, setTotals] = useState([
        { label: "Ferie ap - NO", value: " 10 giorni" },
        { label: "Rol ap - NO", value: "22 ore" },
        { label: "Ex-Fest AP - NO", value: "55 ore" },
        { label: "Ferie - 54", value: "142,30 ore" },
        { label: "Rol - 55", value: "80,30 ore" },
        { label: "Ex-Fest - 56", value: "27 ore" },
        { label: "CompAut.+20 -21", value: "12 giorni" },
        { label: "Ore +/-  +5 -6", value: "0 ore" },
        { label: "Ore Oltre +4", value: "5 ore" },
        { label: "Trasferta a GG 1565", value: "1 giorno" },
    ]);
    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
            PaperProps={{ sx: { position: "fixed", top: 10, left: "20%", m: 0 } }}
        >
            <DialogTitle>Totali</DialogTitle>
            <DialogContent>
                {
                    totals.length > 0 ? totals.map((obj, index) => {
                        return (
                            <div key={index}>
                                <Grid container style={{ minWidth: "350px", borderRadius: "10px", margin: "10px 0px", padding: "5px", color: "black" }}>
                                    <Grid item xs={6}>
                                        <span style={{ fontWeight: "bold", }}>{obj.label} </span>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <span style={{ fontWeight: "bold", color: "#073178", float: "right" }}>{obj.value}</span>
                                    </Grid>

                                </Grid>
                                <Divider></Divider>
                            </div>
                        )
                    }) : <span style={{ color: "#cccccc", fontSize: "18px", fontWeight: "bold" }}>Nessun Totale Trovato</span>
                }
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Chiudi</Button>
            </DialogActions>
        </Dialog>
    )
}


const CausalDialog = (props) => {

    const { obj, handleClose, handleSave, open } = props;
    const [causals, setCausals] = useState([{ causal: "004", q: "0,30" }, { causal: "005", q: "0,30" }]);

    const onChange = (name, value, index) => {
        let fakeArray = [...causals];
        fakeArray[index] = { ...fakeArray[index], [name]: value };
        setCausals(fakeArray);

    }

    const onDelete = (obj) => {
        let fakeArray = causals.filter(x => x != obj);
        setCausals(fakeArray);
    }

    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
            PaperProps={{ sx: { position: "fixed", top: 10, left: "20%", m: 0 } }}
        >
            <DialogTitle>Causali</DialogTitle>
            <DialogContent>
                {causals.length > 0 ? causals.map((obj, index) => {
                    return (
                        <Grid key={index} container>
                            <Grid item xs={5} style={{ padding: "5px" }}>
                                <TextField name="causal" fullWidth label="Causale" value={obj.causal ? obj.causal : ""} onChange={(e) => { onChange(e.target.name, e.target.value, index) }} />
                            </Grid>
                            <Grid item xs={5} style={{ padding: "5px" }}>
                                <TextField name="q" fullWidth label="Quantità" value={obj.q ? obj.q : ""} onChange={(e) => { onChange(e.target.name, e.target.value, index) }}></TextField>
                            </Grid>
                            <Grid item xs={2} style={{ padding: "5px" }}>
                                <IconButton style={{ margin: "8px" }} onClick={() => { onDelete(obj) }}><ClearIcon /></IconButton>
                            </Grid>
                        </Grid>)

                }) : <h2 style={{ color: "#cccccc", fontSize: "18px", textTransform: "uppercase" }}>Nessuna Causale Presente</h2>}


                <div style={{ width: "100%", margin: "0 auto", textAlign: "center" }}>
                    <Button variant="contained" style={{ margin: "0 auto", marginTop: "20px", width: "200px" }} onClick={() => { setCausals(curr => [...curr, { causal: "", q: "" }]) }}>Aggiungi Causale</Button>
                </div>

            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Annulla</Button>
                <Button onClick={handleClose}>Salva</Button>
            </DialogActions>
        </Dialog>
    )
}




const CodeOrDescription = ({ show, callbackFunction }) => {
    return (
        <IconButton
            style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)" }}
            onClick={() => { callbackFunction() }}>
            {!show ?
                <IntegrationInstructionsIcon style={{ width: "30px", height: "30px" }} />
                :
                <DescriptionIcon style={{ width: "30px", height: "30px" }} />
            }
        </IconButton>
    )
}

const Timbratura = (props) => {
    const { inside, outside, color, style, className, onClick } = props;
    return (
        <Grid onClick={onClick} className={className} container style={{ padding: "10px", boxShadow: "0px 0px 5px rgba(0,0,0,0.2)", marginBottom: "10px", borderRadius: "10px", backgroundColor: color ? color : "#3d046e", textAlign: "center", color: "white", ...style }}>
            <Grid item xs={12} md={6} style={{ display: "flex", flex: "start", alignItems: "center", padding: "0px 10px", fontSize: "22px", textAlign: "center" }}>
                <div style={{ display: "flex", alignItems: "center", textAlign: "center", margin: "0 auto" }}><LoginIcon style={{ color: "#0ceba4", width: "35px", height: "35px" }} /><span style={{ padding: "10px", fontWeight: "bold" }}>{inside}</span></div>
            </Grid>
            <Grid item xs={12} md={6} style={{ display: "flex", alignItems: "center", padding: "0px 10px", fontSize: "22px" }}>
                <div style={{ display: "flex", alignItems: "center", textAlign: "center", margin: "0 auto" }}><LogoutIcon style={{ color: "#f74d94", width: "35px", height: "35px" }} /><span style={{ padding: "10px", fontWeight: "bold" }}>{outside}</span></div>
            </Grid>
        </Grid>
    )
}



export default Adrg;