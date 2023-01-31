import {ResponsiveBar} from '@nivo/bar';
import {useColorModeValue} from "@chakra-ui/react";

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const exData = [
    {
        day: "Monday",
        degress: 59
    },
    {
        day: "Tuesday",
        degress: 61
    },
    {
        day: "Wednesday",
        degress: 55
    },
    {
        day: "Thursday",
        degress: 78
    },
    {
        day: "Friday",
        degress: 71
    },
    {
        day: "Saturday",
        degress: 56
    },
    {
        day: "Sunday",
        degress: 67
    }
];

type ChartTestProps = {
    data: any;
    keys: string[];
    indexBy: string;
}
const MyResponsiveBar = ({data,keys,indexBy}:ChartTestProps) => {
    return (
        <ResponsiveBar theme={{
            "background": "transparent",
            "textColor": useColorModeValue("#333333","#CBD5E0"),
            "fontSize": 11,
            "axis": {
                "domain": {
                    "line": {
                        "stroke": useColorModeValue("#333333","#CBD5E0"),
                        "strokeWidth": 1
                    }
                },
                "legend": {
                    "text": {
                        "fontSize": 12,
                        "fill": "#333333"
                    }
                },
                "ticks": {
                    "line": {
                        "stroke": useColorModeValue("#777777","#CBD5E0"),
                        "strokeWidth": 1
                    },
                    "text": {
                        "fontSize": 11,
                        "fill": useColorModeValue("#333333","#CBD5E0")
                    }
                }
            },
            "grid": {
                "line": {
                    "stroke": useColorModeValue("#dddddd",'RGBA(255, 255, 255, 0.16)'),
                    "strokeWidth": 1
                }
            },
            "legends": {
                "title": {
                    "text": {
                        "fontSize": 11,
                        "fill": "#333333"
                    }
                },
                "text": {
                    "fontSize": 11,
                    "fill": "#333333"
                },
                "ticks": {
                    "line": {},
                    "text": {
                        "fontSize": 10,
                        "fill": "#333333"
                    }
                }
            },
            "annotations": {
                "text": {
                    "fontSize": 13,
                    "fill": "#333333",
                    "outlineWidth": 2,
                    "outlineColor": "#ffffff",
                    "outlineOpacity": 1
                },
                "link": {
                    "stroke": "#000000",
                    "strokeWidth": 1,
                    "outlineWidth": 2,
                    "outlineColor": "#ffffff",
                    "outlineOpacity": 1
                },
                "outline": {
                    "stroke": "#000000",
                    "strokeWidth": 2,
                    "outlineWidth": 2,
                    "outlineColor": "#ffffff",
                    "outlineOpacity": 1
                },
                "symbol": {
                    "fill": "#000000",
                    "outlineWidth": 2,
                    "outlineColor": "#ffffff",
                    "outlineOpacity": 1
                }
            },
            "tooltip": {
                "container": {
                    "background": "#ffffff",
                    "color": "#333333",
                    "fontSize": 12
                },
                "basic": {},
                "chip": {},
                "table": {},
                "tableCell": {},
                "tableCellValue": {}
            }
        }}
            data={data}
            keys={keys}
            indexBy={indexBy}
            margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
            padding={0.4}
            valueScale={{ type: "linear" }}
            colors="#3182CE"
            animate={true}
            enableLabel={false}
            axisTop={null}
            axisRight={null}
            axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                // legend: keys[0],
                legendPosition: "middle",
                legendOffset: -40
            }}
        />
    );
}

export default MyResponsiveBar;