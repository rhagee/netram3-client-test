import "./adrg.css";
import IconButton from '@mui/material/IconButton';
import { FixedSizeList } from 'react-window';
import ListItemButton from '@mui/material/ListItemButton';
import InputAdornment from "@mui/material/InputAdornment";
import Divider from "@mui/material/Divider";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SearchIcon from '@mui/icons-material/Search';

import { Grid, ListItem, TextField } from '@mui/material';
import { useTar, RamModule } from '@ram-sc/ram-components-package';
import { useEffect, useState } from 'react';
import { Request_Tar, Request_Tad } from '../api/Requests';

function renderRow(props) {
    const { data, index, style } = props;
    const { list, setCurrTar, setCurrTad, tar, setContentTar, setContentTad } = data;
    const tarObj = { ...list[index] };

    let currentTar = JSON.parse(JSON.stringify(tar));
    let currentTad = JSON.parse(JSON.stringify(tar));
    let usedValuesTar = [];
    let unusedValuesTar = [];
    let usedValuesTad = [];
    let unusedValuesTad = [];

    const setElement = () => {
        const divideArray = (array, chunkSize) => {
            const result = [];
            const length = array.length;
            for (let i = 0; i < length; i += chunkSize) {
                result.push(array.slice(i, i + chunkSize));
            }
            return result;
        }
        //#region generate tar
        currentTar["AX002"].value = tarObj["AX002"];//cod. identificativo
        currentTar["AX011"].value = tarObj["AX011"];//descrizione
        if (tarObj["AX007"] == 2 || tarObj["AX007"] == 3) {//il campo è un numerico, quindi voglio vedere anche se il numero dei decimali, il valore minimo e massimo sono 0
            currentTar["AX032"].value = tarObj["AX032"];//valore massimo
            currentTar["AX033"].value = tarObj["AX033"];//valore minimo
        }
        else {
            currentTar["AX032"].value = tarObj["AX032"] == 0 ? '' : tarObj["AX032"];//valore massimo
            currentTar["AX033"].value = tarObj["AX033"] == 0 ? '' : tarObj["AX033"];//valore minimo
        }
        currentTar["AX043"].value = tarObj["AX043"];//tipo decodifica
        currentTar["AX044"].value = tarObj["AX044"];//carattere fill
        currentTar["AX045"].value = tarObj["AX045"];//tipo fill
        currentTar["AX047"].value = tarObj["AX047"];//tabella alias
        currentTar["AX048"].value = tarObj["AX048"];//set di caratteri        
        currentTar["AX051"].value = tarObj["AX051"] === 'x' ? 'NO' : 'SI';//contiene minuti 60'
        currentTar["AX052"].value = tarObj["AX052"] === 'x' ? 'NO' : 'SI';//visualiiza in minuti
        currentTar["AX061"].value = tarObj["AX061"] === 'x' ? 'NO' : 'SI';//accetta campo vuoto
        currentTar["AX062"].value = tarObj["AX062"];//colonne a video
        console.log("CURR TAR", currentTar, " tarobj : ", tarObj);
        //#endregion

        //#region generate tad
        const onDone = (res) => {
            if (!res.error.value) {
                let value = Object.keys(res.data).map(key => res.data[key]);
                if (value.length > 0) {

                    const tadObj = value[0];
                    currentTad["AX002"].value = tadObj["AY002"];//cod. identificativo
                    currentTad["AX011"].value = tadObj["AY011"];//descrizione
                    if (tadObj["AY007"] == 2 || tadObj["AY007"] == 3) {//il campo è un numerico, quindi voglio vedere anche se il numero dei decimali, il valore minimo e massimo sono 0
                        currentTad["AX032"].value = tadObj["AY032"];//valore massimo
                        currentTad["AX033"].value = tadObj["AY033"];//valore minimo
                    }
                    else {
                        currentTad["AX032"].value = tadObj["AY032"] == 0 ? '' : tadObj["AY032"];//valore massimo
                        currentTad["AX033"].value = tadObj["AY033"] == 0 ? '' : tadObj["AY033"];//valore minimo
                    }
                    currentTad["AX043"].value = tadObj["AY043"];//tipo decodifica
                    currentTad["AX044"].value = tadObj["AY044"];//carattere fill
                    currentTad["AX045"].value = tadObj["AY045"];//tipo fill
                    currentTad["AX047"].value = tadObj["AY047"];//tabella alias
                    currentTad["AX048"].value = tadObj["AY048"];//set di caratteri        
                    currentTad["AX051"].value = tadObj["AY051"] === 'x' ? 'NO' : 'SI';//contiene minuti 60'
                    currentTad["AX052"].value = tadObj["AY052"] === 'x' ? 'NO' : 'SI';//visualiiza in minuti
                    currentTad["AX061"].value = tadObj["AY061"] === 'x' ? 'NO' : 'SI';//accetta campo vuoto
                    currentTad["AX062"].value = tadObj["AY062"];//colonne a video
                }
                else {
                    currentTad = { ...currentTar };
                }


                Object.keys(currentTar).forEach(key => currentTar[key].value && currentTar[key].value !== 'NO' ? usedValuesTar.push(key) : unusedValuesTar.push(key))
                Object.keys(currentTad).forEach(key => currentTad[key].value && currentTad[key].value !== 'NO' ? usedValuesTad.push(key) : unusedValuesTad.push(key))

                if (usedValuesTar.length !== usedValuesTad.length) { //ci sono dei campi compilati da una parte ma dall'altra no

                }


                setContentTar([divideArray(usedValuesTad, 1), divideArray(unusedValuesTad, 1)])
                setContentTad([divideArray(usedValuesTad, 1), divideArray(unusedValuesTad, 1)])

                setCurrTar(currentTar);
                setCurrTad(currentTad);

            }
            else
                console.log(res)
        }
        //#endregion
        Request_Tad(tarObj["AX002"], "rs", "666", onDone);
    }

    return (
        <ListItem style={style} key={index} disablePadding>
            <ListItemButton style={{ height: "100%" }} onClick={() => { setElement() }}>
                <Element desc={tarObj.AX011} codice={tarObj.AX002} />
            </ListItemButton>
        </ListItem>
    );
}

const Element = ({ desc, codice }) => {

    return (
        <Grid container style={{ position: "relative", width: "100%" }}>
            <Grid item xs={12} md={6}>
                <span style={{ color: "#4b2f70", fontWeight: "bold" }}>{codice}</span>
            </Grid>
            <Grid item xs={12} md={6}>
                <span style={{ margin: "0 auto", textAlign: "center", width: "100%" }}>{desc}</span>
            </Grid>
        </Grid>
    )
}

const Tad = () => {
    const { tar } = useTar("rs", "666", "AX", "table", undefined);
    const [currTad, setCurrTad] = useState(tar ? { ...tar } : undefined);
    const [currTar, setCurrTar] = useState(tar ? { ...tar } : undefined);
    const [contentTar, setContentTar] = useState([[[undefined, undefined, undefined]]]);
    const [contentTad, setContentTad] = useState([[[undefined, undefined, undefined]]]);
    useEffect(() => {
        if (tar)
            Object.keys(tar).forEach((key) => {
                tar[key] = { ...tar[key], disabled: true }
            })
    }, [tar])
    return (
        <div className="adrg-container">
            <Grid container spacing={2}>
                <ElementsSide setCurrTar={setCurrTar} setCurrTad={setCurrTad} tar={tar} setContentTar={setContentTar} setContentTad={setContentTad} />
                <TarSide currTar={currTar} currTad={currTad} contentTar={contentTar} contentTad={contentTad} />
            </Grid>
        </div>
    );
};


const ElementsSide = (props) => {
    const { setCurrTar, setCurrTad, tar, setContentTar, setContentTad } = props;
    const [tarToShow, setTarToShow] = useState(undefined);
    const [elements, setElements] = useState([]);
    useEffect(() => {
        const onDone = (res) => {
            if (!res.error.value)
                /*trasformo oggetto contenente oggetti in un array contenente oggetti*/
                setElements(Object.keys(res.data).map(key => res.data[key]));
            else
                console.log(res)
        }
        const timeOutId = setTimeout(() => {
            if (tarToShow)
                Request_Tar(tarToShow, onDone);
            else if (tarToShow === "")
                setElements(undefined)
        }, 500);
        return () => clearTimeout(timeOutId);
    }, [tarToShow])

    return (
        <Grid item md={12} lg={3} className="user-side">
            <div className="top-user-side">
                <Grid container style={{ display: "flex", alignItems: "center" }}>
                    <Grid item xs={10} md={10}><TextField variant="outlined" label="Cerca..." InputProps={{
                        endAdornment: (
                            <InputAdornment><SearchIcon /></InputAdornment>
                        )
                    }} onChange={(e) => { setTarToShow(e.target.value) }} /></Grid>
                    <Grid item xs={2} md={2}><IconButton><FilterAltIcon /></IconButton></Grid>
                </Grid>
            </div>
            <div className='list-user-side'>
                <ElementList elements={elements} setCurrTar={setCurrTar} setCurrTad={setCurrTad} tar={tar} setContentTar={setContentTar} setContentTad={setContentTad} />
            </div>
        </Grid>
    )
}

const ElementList = (props) => {
    const { elements, setCurrTar, setCurrTad, tar, setContentTar, setContentTad } = props;

    return (
        <div>
            <Grid container style={{ position: "relative", width: "100%", textAlign: "left", padding: "20px" }}>
                <Grid item xs={12} md={6}>
                    <span style={{ color: "#4b2f70", fontWeight: "bold" }}>Codice</span>
                </Grid>
                <Grid item xs={12} md={6}>
                    <span style={{ margin: "0 auto", width: "100%", fontWeight: "bold" }}>Descrizione</span>
                </Grid>
            </Grid>
            <Divider />
            <FixedSizeList
                style={{ margin: "0 auto" }}
                height={680}
                width={"100%"}
                itemSize={60}
                itemCount={elements.length}
                overscanCount={5}
                itemData={{ list: elements, setCurrTar: setCurrTar, setCurrTad: setCurrTad, tar: tar, setContentTar: setContentTar, setContentTad: setContentTad }}
            >
                {renderRow}
            </FixedSizeList>
        </div>

    )
}


const TarSide = (props) => {
    const { currTar, currTad, contentTar, contentTad } = props;
    const pages = ["Campi utilizzati", "Campi non utilizzati"];

    return (
        <Grid item md={12} lg={9} className="adrg-side">
            <div className="user-data">
                <span>TAR</span>
            </div>
            <Grid item container className="adrg-box">
                <Grid item xs={6}>
                    <RamModule data={currTar} content={contentTar} noButton centered={true} width="100%" pages={pages} />
                </Grid>
                <Grid item xs={6}>
                    <RamModule data={currTad} content={contentTad} noButton centered={true} width="100%" pages={pages} />
                </Grid>
            </Grid>
        </Grid>
    )
}
export default Tad;