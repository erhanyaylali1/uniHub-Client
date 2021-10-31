import { makeStyles } from '@material-ui/core/node_modules/@material-ui/styles'
import { Col } from 'antd';
import React from 'react'

const EachChoiceCard = ({ choiceNumber, choice, index, isSelected, setSelected }) => {

    const classes = useStyle();

    const handleClick = () => {
        setSelected(index)
    }

    return (
        <Col className={`${classes.root} ${isSelected ? classes.selected:classes.notSelected}`} xs={24} md={11} onClick={handleClick}>
            {choiceNumber}) {choice}
        </Col>
    )
}

export default EachChoiceCard

const useStyle = makeStyles({
    root :{
        padding: "10px 20px",
        borderRadius: 7,
        cursor: 'pointer',
        textTransform: "capitalize",
        fontWeight: 700
    },
    notSelected: {
        border: "2px solid #217696",
        color: "#217696",
        "&:hover": {
            backgroundColor: 'rgba(0,0,0,0.03)'
        }
    },
    selected: {        
        border: "2px solid transparent",
        backgroundColor: "#1d821d",
        color: 'white'
    }
})
