import {createTheme, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, ThemeProvider} from "@mui/material";

const theme = createTheme({
    components: {
        MuiFormLabel: {
            styleOverrides: {
                root: {
                    color: "#47525E !important",
                    fontFamily: "Agbalumo"
                }
            }
        }
    }
});

function CheckBoxGroupComponent<T>(props: {
    fromLabel: string,
    selected: T,
    setSelected(param: T): void,
    values: Array<{ value: T, label: string }>
}) {
    return (
        <FormControl>
            <ThemeProvider theme={theme}>
                <FormLabel id="demo-row-radio-buttons-group-label">{props.fromLabel}</FormLabel>
            </ThemeProvider>
            <RadioGroup
                row
                value={props.selected}
                onChange={(e) => props.setSelected(e.target.value as T)}
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
            >
                {props.values.map((v) => {
                    return <FormControlLabel key={v.label} value={v.value} control={<Radio sx={{
                        '&, &.Mui-checked': {
                            color: '#0fbd5c',
                        }
                    }}/>} label={v.label}/>

                })}
            </RadioGroup>
        </FormControl>
    )
}

export default CheckBoxGroupComponent;