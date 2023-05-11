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

import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import ListAltIcon from '@mui/icons-material/ListAlt';
import CalculateIcon from '@mui/icons-material/Calculate';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';

{/* UTILIZZABILE FINO A 1024 Pixel Width */ }

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
                            <InputAdornment position="end"><SearchIcon /></InputAdornment>
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
                                    <Divider orientation="vertical" style={{ marginLeft: "0px !important", height: "100%" }} >
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
        <List style={{ padding: "10px" }}>
            {[...Array(30)].map((obj, index) => {
                return (
                    <ListItem key={index} style={{ borderBottom: "1px solid rgba(0,0,0,0.2)" }} disablePadding>
                        <ListItemButton onClick={() => { setOpenDays(false) }}>
                            <Grid container style={{ width: "100%" }}>

                                <Grid item xs={12} md={openDays ? 2 : 10} style={{ width: "100%", display: "block", textAlign: "center" }}>
                                    <span style={{ fontWeight: "bold", color: "gray", fontSize: "18px" }}>
                                        <div style={{ margin: "0 auto", backgroundColor: "#043782", width: "100%", maxWidth: "100px", height: "25px", border: "1px solid rgba(0,0,0,0.2)", borderTopLeftRadius: "10px", borderTopRightRadius: "10px", color: "white", fontSize: "12px", lineHeight: "25px", textAlign: "center", verticalAlign: "middle", alignItems: "center" }}>Day</div>

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
                                <Grid item xs={12} md={2} style={{ position: "relative" }}>
                                    {
                                        openDays ? <div style={{ width: "100% !important", margin: "0 auto", position: "relative" }}> <span style={{ padding: "5px 0px", display: "block", color: "#0da61a", width: "100% !important", fontWeight: "bold", fontSize: "10px", borderRadius: "15px", textTransform: "uppercase", textAlign: "center" }}>Giorno Ok</span> <div style={{ margin: "0 auto", width: "20px", height: "20px", borderRadius: "100%", background: "radial-gradient(circle at 5px 5px, #56f064, #0da61a)" }}></div></div> : <div style={{ position: "absolute", top: "40%", left: "50%", trasnform: "translate(-50%,-50%)", width: "15px", height: "15px", borderRadius: "100%", background: "radial-gradient(circle at 5px 5px, #56f064, #0da61a)" }}></div>
                                    }

                                </Grid>
                            </Grid>

                        </ListItemButton>
                    </ListItem>
                )
            })}
        </List>
    )
}

const AdrgData = () => {

    const [showStandard, setShowStandard] = useState(false);
    const [showHCode, setShowHCode] = useState(false);
    const [showBCCode, setShowBCCode] = useState(false);
    const [showFCode, setShowFCode] = useState(false);
    const [editObj, setEditObj] = useState({});
    const [editInfoObj, setEditInfoObj] = useState({});
    const [open, setOpen] = useState(false);
    const [openInfo, setOpenInfo] = useState(false);
    const [openTotal, setOpenTotal] = useState(false);
    const [openCausal, setOpenCausal] = useState(false);
    const [causalObj, setCausalObj] = useState({});
    const [totalObj, setTotalObj] = useState({});

    return (
        <div style={{ width: "90%", margin: "0 auto", position: "relative" }}>
            <div style={{ position: "absolute", left: "0", top: "-6px" }}>
                <IconButton style={{ backgroundColor: "#010b7a", color: "white", padding: "7px", margin: "0px 5px" }}><CalculateIcon /></IconButton> {/*Calcola*/}
                <IconButton style={{ backgroundColor: "#c20817", color: "white", padding: "7px", margin: "0px 5px" }}><HighlightOffIcon /></IconButton> {/*Pulisci*/}
            </div>
            <div style={{ position: "absolute", right: "0", top: "-6px" }}>
                <IconButton style={{ backgroundColor: "#3d046e", color: "white", padding: "7px", margin: "0px 5px" }} onClick={() => { setOpenTotal(true) }}><ListAltIcon /></IconButton>
                {/*Totali*/}
            </div>
            <h2 style={{ fontSize: "18px", textTransform: "uppercase", color: "rgba(0,0,0,0.7)" }}>1 GENNAIO 2023</h2>
            <Divider style={{ margin: "10px 0px" }}></Divider>
            <div style={{ position: "absolute", right: "0", top: "50px" }}><IconButton style={{ color: "#212121" }} onClick={() => { setOpenInfo(true) }}><EditIcon /></IconButton></div>
            <div style={{ position: "absolute", left: "0", top: "50px" }}></div>
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
                    style={{ position: "relative", border: "1px solid rgba(0,0,0,0.2)", marginBottom: "10px", borderRadius: "10px", padding: "10px", fontWeight: "bold", fontSize: "22px", boxShadow: "0px 0px 5px rgba(0,0,0,0.2)" }}
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
                <div style={{ position: "absolute", left: "0", top: "-8px" }}><IconButton style={{ boxShadow: "0px 0px 10px rgba(0,0,0,0.2)", color: "rgb(1, 32, 94)", border: "1px solid rgb(1, 32, 94)", padding: "5px" }} onClick={() => { setOpenCausal(true) }}>  <Badge badgeContent={2} color="error"><PlaylistAddCheckIcon /></Badge></IconButton></div>

                <Timbratura onClick={() => { setEditObj({ inside: "8.30", outside: "12.40" }); setOpen(true); }} style={{ cursor: "pointer" }} color="#01205e" inside="8.30" outside="12.40" />
                <Timbratura onClick={() => { setEditObj({ inside: "13.40", outside: "17.40" }); setOpen(true); }} style={{ cursor: "pointer" }} color="#01205e" inside="13.40" outside="17.30" />
                <Timbratura onClick={() => { setEditObj({ inside: "13.40", outside: "17.40" }); setOpen(true); }} style={{ cursor: "pointer" }} color="#01205e" inside="13.40" outside="17.30" />
            </div>
            <InfoDialog open={openInfo} handleClose={() => { setOpenInfo(false) }} obj={editInfoObj} />
            <TimbroDialog open={open} handleClose={() => { setEditObj(undefined); setOpen(false); }} obj={editObj} />
            <TotalDialog open={openTotal} handleClose={() => { setOpenTotal(false) }} obj={totalObj} />
            <CausalDialog open={openCausal} handleClose={() => { setOpenCausal(false) }} obj={causalObj} />
        </div >
    )
}

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


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
                        <Timbratura style={{ backgroundColor: "#242424", color: "white" }} inside="8.30" outside="12.30" />
                        <Timbratura style={{ backgroundColor: "#242424", color: "white" }} inside="13.30" outside="17.30" />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Salva</Button>
                <Button onClick={handleClose}>Annulla</Button>
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
                <Button onClick={handleClose}>Salva</Button>
                <Button onClick={handleClose}>Annulla</Button>
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
                            <div>
                                <Grid container key={index} style={{ minWidth: "350px", borderRadius: "10px", margin: "10px 0px", padding: "5px", color: "black" }}>
                                    <Grid xs={6}>
                                        <span style={{ fontWeight: "bold", }}>{obj.label} </span>
                                    </Grid>
                                    <Grid xs={6}>
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
                <Button onClick={handleClose}>Salva</Button>
                <Button onClick={handleClose}>Annulla</Button>
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