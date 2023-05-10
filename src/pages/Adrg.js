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

    return (
        <div style={{ width: "90%", margin: "0 auto", position: "relative" }}>
            <h2 style={{ fontSize: "18px", textTransform: "uppercase", color: "rgba(0,0,0,0.7)" }}>1 GENNAIO 2023</h2>
            <Divider style={{ margin: "10px 0px" }}></Divider>
            <div style={{ position: "absolute", right: "0", top: "50px" }}><IconButton style={{ color: "#212121" }} onClick={() => { setOpenInfo(true) }}><EditIcon /></IconButton></div>
            <h2 style={{ fontSize: "16px", textTransform: "uppercase", color: "rgba(0,0,0,0.7)", marginBottom: "20px" }}>Informazioni</h2>
            <Grid container spacing={2} style={{ marginBottom: "20px" }}>
                <Grid item xs={12} style={{ width: "100%" }} >
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

                <Timbratura onClick={() => { setEditObj({ inside: "8.30", outside: "12.40" }); setOpen(true); }} style={{ cursor: "pointer" }} color="#01205e" inside="8.30" outside="12.40" />

                <Timbratura onClick={() => { setEditObj({ inside: "13.40", outside: "17.40" }); setOpen(true); }} style={{ cursor: "pointer" }} color="#01205e" inside="13.40" outside="17.30" />

            </div>
            <InfoDialog open={openInfo} handleClose={() => { setOpenInfo(false) }} obj={editInfoObj} />
            <TimbroDialog open={open} handleClose={() => { setOpen(false) }} obj={editObj} />
        </div >
    )
}

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


const InfoDialog = (props) => {

    const { obj, handleClose, handleSave, open } = props;
    console.log(obj);
    return (
        <Dialog
            open={open}
            PaperComponent={PaperComponent}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-labelledby="draggable-dialog-title"
            PaperProps={{ sx: { position: "fixed", top: 10, left: "20%", m: 0 } }}
        >
            <DialogTitle style={{ cursor: 'move' }}>Modifica Informazioni</DialogTitle>
            <DialogContent>
                <Divider style={{ margin: "10px 0px", fontSize: "14px", textTransform: "uppercase" }}>/// Entrata ///</Divider>
                <Grid container>
                    <Grid item xs={12} md={4} style={{ padding: "5px" }}>
                        <TextField label="Entrata" defaultValue="" value={obj.inside ? obj.inside : ""} />
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
                        <TextField label="Uscita" defaultValue="" value={obj.outside ? obj.outside : ""} />
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

const TimbroDialog = (props) => {

    const { obj, handleClose, handleSave, open } = props;
    console.log(obj);
    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle>Modifica Timbro</DialogTitle>
            <DialogContent>
                <Divider style={{ margin: "10px 0px", fontSize: "14px", textTransform: "uppercase" }}>/// Entrata ///</Divider>
                <Grid container>
                    <Grid item xs={12} md={4} style={{ padding: "5px" }}>
                        <TextField label="Entrata" defaultValue="" value={obj.inside ? obj.inside : ""} />
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
                        <TextField label="Uscita" defaultValue="" value={obj.outside ? obj.outside : ""} />
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
        <Grid onClick={onClick} className={className} container style={{ ...style, padding: "10px", boxShadow: "0px 0px 5px rgba(0,0,0,0.2)", marginBottom: "10px", borderRadius: "10px", backgroundColor: color ? color : "#3d046e", textAlign: "center" }}>
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