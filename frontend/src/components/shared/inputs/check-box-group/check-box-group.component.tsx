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

function CheckBoxGroupComponent(props: { fromLabel: string, values: Array<{ value: any, label: string }> }) {
    return (
        <FormControl>
            <ThemeProvider theme={theme}>
                <FormLabel id="demo-row-radio-buttons-group-label">{props.fromLabel}</FormLabel>
            </ThemeProvider>
            <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
            >
                {props.values.map((v) => {
                    return <FormControlLabel value={v.value} control={<Radio sx={{
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