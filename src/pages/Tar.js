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
import { Request_Tar } from '../api/Requests';

function renderRow(props) {
    const { data, index, style } = props;
    const { list, setCurr, tar, setContent } = data;
    const obj = list[index];
    let currentTar = { ...tar };
    let usedValues = [];
    let unusedValues = [];
    const setElement = () => {
        const divideArray = (array, chunkSize) => {
            const result = [];
            const length = array.length;
            for (let i = 0; i < length; i += chunkSize) {
                result.push(array.slice(i, i + chunkSize));
            }
            return result;
        }
        currentTar["AX002"].value = obj["AX002"];//cod. identificativo
        currentTar["AX003"].value = obj["AX003"] == 0 ? '' : obj["AX003"];//colonna inizio
        currentTar["AX004"].value = obj["AX004"] == 0 ? '' : obj["AX004"];//lunghezza fisica
        currentTar["AX005"].value = obj["AX005"] == 0 ? '' : obj["AX031"];//occurs
        currentTar["AX006"].value = obj["AX006"] == 0 ? '' : obj["AX031"];//passo ricorrenze
        currentTar["AX007"].value = obj["AX007"];//tipo edit
        currentTar["AX011"].value = obj["AX011"];//descrizione
        if (obj["AX007"] == 2 || obj["AX007"] == 3) {//il campo è un numerico, quindi voglio vedere anche se il numero dei decimali, il valore minimo e massimo sono 0
            currentTar["AX031"].value = obj["AX031"];//numero decimali
            currentTar["AX032"].value = obj["AX032"];//valore massimo
            currentTar["AX033"].value = obj["AX033"];//valore minimo
        }
        else {
            currentTar["AX031"].value = obj["AX031"] == 0 ? '' : obj["AX031"];//numero decimali
            currentTar["AX032"].value = obj["AX032"] == 0 ? '' : obj["AX032"];//valore massimo
            currentTar["AX033"].value = obj["AX033"] == 0 ? '' : obj["AX033"];//valore minimo
        }
        currentTar["AX043"].value = obj["AX043"];//tipo decodifica
        currentTar["AX044"].value = obj["AX044"];//carattere fill
        currentTar["AX045"].value = obj["AX045"];//tipo fill
        currentTar["AX047"].value = obj["AX047"];//tabella alias
        currentTar["AX048"].value = obj["AX048"];//set di caratteri        
        currentTar["AX051"].value = obj["AX051"] === 'x' ? 'NO' : 'SI';//contiene minuti 60'
        currentTar["AX052"].value = obj["AX052"] === 'x' ? 'NO' : 'SI';//visualiiza in minuti
        currentTar["AX061"].value = obj["AX061"] === 'x' ? 'NO' : 'SI';//accetta campo vuoto
        currentTar["AX062"].value = obj["AX062"];//colonne a video
        currentTar["AX063"].value = obj["AX063"] === 'x' ? 'NO' : 'SI';//segmento chiave

        Object.keys(currentTar).forEach(key => currentTar[key].value && currentTar[key].value !== 'NO' ? usedValues.push(key) : unusedValues.push(key))
        setContent([divideArray(usedValues, 3), divideArray(unusedValues, 3)])
        setCurr(currentTar);
    }
    return (
        <ListItem style={style} key={index} disablePadding>
            <ListItemButton style={{ height: "100%" }} onClick={() => { setElement() }}>
                <Element desc={obj.AX011} codice={obj.AX002} />
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

const Tar = () => {
    const { tar } = useTar("rs", "666", "AX", "table", undefined);
    const [curr, setCurr] = useState(tar ? { ...tar } : undefined);
    const [content, setContent] = useState([[["AX002", "AX011", "AX007"]]]);
    useEffect(() => {
        if (tar)
            Object.keys(tar).forEach((key) => {
                tar[key] = { ...tar[key], disabled: true }
            })
    }, [tar])
    return (
        <div className="adrg-container">
            <Grid container spacing={2}>
                <ElementsSide setCurr={setCurr} tar={tar} setContent={setContent} />
                <TarSide curr={curr} content={content} />
            </Grid>
        </div>
    );
};


const ElementsSide = (props) => {
    const { setCurr, tar, setContent } = props;
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
                <ElementList elements={elements} setCurr={setCurr} tar={tar} setContent={setContent} />
            </div>
        </Grid>
    )
}

const ElementList = (props) => {
    const { elements, setCurr, tar, setContent } = props;

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
                itemData={{ list: elements, setCurr: setCurr, tar: tar, setContent: setContent }}
            >
                {renderRow}
            </FixedSizeList>
        </div>

    )
}


const TarSide = (props) => {
    const { curr, content } = props;
    /*const content = [
        [
            ["AX002", "AX011", "AX007"],
            ["AX005", "AX006", "AX004"],
            ["AX003", "AX031", "AX032"],
            ["AX033", "AX043", "AX044"],
        ],
        [
            ["AX045", "AX051", "AX052"],
            ["AX061", "AX062", "AX063"],
            ["AX047", "AX048",]
        ]
    ];*/

    const pages = ["Campi utilizzati", "Campi non utilizzati"];

    return (
        <Grid item md={12} lg={9} className="adrg-side">
            <div className="user-data">
                <span>TAR</span>
            </div>
            <Grid item container className="adrg-box">
                <Grid item xs={12}>
                    <RamModule data={curr} content={content} noButton centered={true} width="100%" pages={pages} />
                </Grid>
            </Grid >
        </Grid >
    )
}
export default Tar;