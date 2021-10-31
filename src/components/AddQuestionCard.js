import React from 'react'
import { Upload, Button, Input, Row } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { makeStyles } from '@material-ui/core/styles';  

const AddQuestionCard = ({ index, question, onHandleUpload, handleChoicesChange, handleQuestionChange, handleAnswerChange }) => {

    const classes = useStyles()

    return (
        <div className={classes.row}>
            <Row>
                <Input.TextArea
                    rows={4}
                    placeholder="Question" 
                    value={question.name}
                    onChange={(e) => handleQuestionChange(e.target.value, index)}
                />
            </Row>
            <Row  className={classes.row}>  
                <Upload
                    listType="picture"
                    onChange={(value) => onHandleUpload(value, index)} 
                    beforeUpload={() => false}
                >
                    <Button icon={<UploadOutlined />}>Select File</Button>
                </Upload>
            </Row>
            <Row>
                <Input 
                    placeholder="Choice 1" 
                    value={question.choice1}
                    onChange={(e) => handleChoicesChange(e.target.value, 1, index)}
                />
            </Row>
            <Row>
                <Input 
                    placeholder="Choice 2" 
                    value={question.choice2}
                    onChange={(e) => handleChoicesChange(e.target.value, 2, index)}
                />
            </Row>
            <Row>
                <Input 
                    placeholder="Choice 3" 
                    value={question.choice3}
                    onChange={(e) => handleChoicesChange(e.target.value, 3, index)}
                />
            </Row>
            <Row>
                <Input 
                    placeholder="Choice 4" 
                    value={question.choice4}
                    onChange={(e) => handleChoicesChange(e.target.value, 4, index)}
                />
            </Row>
            <Row>
                <Input 
                    placeholder="Answer (Correct Choice's Number e.g. 3)"
                    value={question.answer}
                    onChange={(e) => handleAnswerChange(e.target.value, index)}    
                />
            </Row>
        </div>
    )
}

export default AddQuestionCard

const useStyles = makeStyles({
	row: {
        "& div.ant-row": {
            marginBottom: 20,
        } 
    },
});