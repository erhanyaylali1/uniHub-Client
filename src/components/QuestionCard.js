import { makeStyles } from '@material-ui/core/node_modules/@material-ui/styles'
import { Col, Row, Modal } from 'antd'
import React, { useEffect, useState } from 'react'
import EachChoiceCard from './EachChoiceCard';
import { Button, Icon } from 'semantic-ui-react'
import { getScreenSize } from '../features/generalSlice';
import { useSelector } from 'react-redux';

const QuestionCard = ({ question, index, setIndex, selectedGlobal, setSelectedGlobal, length, saveResults }) => {

    const screenSize = useSelector(getScreenSize);
    const classes = useStyle();
    const [selected, setSelected] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const choices = ["A", "B", "C", "D"];
    
    useEffect(() => {
        if(selectedGlobal){
            setSelected(selectedGlobal)
        } else {
            setSelected(null)
        }
    },[index])

    const handleClick = (value) => {
        setSelected(value);
        setSelectedGlobal(value);
    }

    const handleNext = () => {
        setIndex(index + 1);
    };

    const handleBack = () => {
        setIndex(index - 1);
    }

    const handleSubmit = async () => {
        await saveResults()
        setIndex(index + 1);
        setIsModalVisible(false)
    }



    const paddingLeftAndRight = {
        paddingLeft: screenSize > 760 ? '20px': '0px',
        paddingRight: screenSize > 760 ? '20px': '0px'
    }


    return (
        <Col style={{ marginTop: screenSize < 500 ? '25px':'50px' }}>
            <Row className={`${classes.questionNumber} ${screenSize > 760 && classes.marginLeft20}`}>
                Question {index + 1}
            </Row>
            <Row style={{ justifyContent: 'center' }}>
                <Col className={classes.answerContainer} style={{ marginRight: screenSize < 500 ? '0':'20px'}}>
                    <Row className={`${classes.question} ${screenSize > 760 && classes.marginLeft20}`}>
                        <Col>
                            {question.question}
                        </Col>
                    </Row>
                    <Row className={classes.choices}>
                        <Row gutter={[0, 20]} className={classes.choicesContainer}>
                            <EachChoiceCard 
                                choice={question.choice1}
                                index={1}
                                choiceNumber={choices[0]}
                                isSelected={selected === 1}
                                setSelected={handleClick}
                            />
                            <EachChoiceCard 
                                choice={question.choice2}
                                index={2}
                                choiceNumber={choices[1]}
                                isSelected={selected === 2}
                                setSelected={handleClick}
                            />
                            <EachChoiceCard 
                                choice={question.choice3}
                                index={3}
                                choiceNumber={choices[2]}
                                isSelected={selected === 3}
                                setSelected={handleClick}
                            />
                            <EachChoiceCard 
                                choice={question.choice4}
                                index={4}
                                choiceNumber={choices[3]}
                                isSelected={selected === 4}
                                setSelected={handleClick}
                            />
                        </Row>
                    </Row>      
                </Col>
                <Col className={classes.imageContainer}>
                    {question.imagePath ? (
                        <img 
                            className={classes.image}
                            style={{ width: screenSize < 500 ? '250px':'300px' }}
                            alt="question"
                            src={`http://localhost:8080/uploads/exams/${question.imagePath}`}
                        />
                    ):(null)}
                </Col>
            </Row>
            <Row className={classes.buttonContainer} style={paddingLeftAndRight} >
                <Button 
                    icon labelPosition='left' 
                    onClick={handleBack} disabled={index === 0} 
                    size={screenSize > 500 ? 'medium':'tiny'}
                >
                    Back
                    <Icon name='arrow left' />
                </Button>
                {index === length - 1 ? (
                    <Button 
                        icon labelPosition='right' 
                        onClick={() => setIsModalVisible(true)} 
                        size={screenSize > 500 ? 'medium':'small'}
                    >
                        Submit
                        <Icon name='save' />
                    </Button>
                ):(
                    <Button 
                        icon labelPosition='right' 
                        onClick={handleNext} 
                        size={screenSize > 500 ? 'medium':'small'}
                    >
                        Next
                        <Icon name='arrow right' />
                    </Button>
                )}
            </Row>      
            <Modal title="Submit Exam" visible={isModalVisible} onOk={handleSubmit} onCancel={() => setIsModalVisible(false)}>
                <p>If you click OK then you can't go back to the exam.</p>
                <p>Are you sure ?</p>
            </Modal>
        </Col>
    )
}

export default QuestionCard

const useStyle = makeStyles({
    questionNumber: {
        fontSize: 20,
        fontWeight: 700,
        marginBottom: 20,
    },
    question: {
        fontSize: 20,
        fontWeight: 500,
        marginBottom: 10,
        justifyContent: 'space-between'
    },
    marginLeft20: {
        marginLeft: 20
    },
    choices: {
        marginTop: 50
    },
    choicesContainer: {
        justifyContent: 'space-around',
        width: '100%'
    },
    buttonContainer: {
        marginTop: 20,  
        paddingTop: 20,
        paddingBottom: 20,
        display: 'flex',
        justifyContent: 'space-between',
    },
    answerContainer:{
        flex: 1
    },
    image: {
        height: 'auto',
    },
    imageContainer: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: 20
    }
})
