import moment from 'moment';
import React, { useState, useEffect } from 'react';
import axios from '../utils/apiCall';
import { Card, Feed, Pagination } from 'semantic-ui-react'
import { makeStyles } from '@material-ui/core';
import QuestionCard from './QuestionCard';
import { Col, Row, Progress, Divider, message } from 'antd';
import { useSelector } from 'react-redux';
import { getScreenSize } from '../features/generalSlice';

const ExamPage = () => {

    const screenSize = useSelector(getScreenSize)
    const classes = useStyle();
    const [isAvaible, setIsAvaible] = useState(false);
    const [questions, setQuestions] = useState({});
    const [index, setIndex] = useState(0);
    const [userChoices, setUserChoices] = useState([]);
    const [remainingTime, setRemainingTime] = useState(moment().format("DD/MM/YYYY HH:mm:ss"));
    const examId = 18;
    const studentId = 2;
    const isFinished = isAvaible ? (index === questions.questions.length ? true:false):false

    const handleSetUserChoices = (value) => {
        userChoices[index] = value;
        setUserChoices(userChoices);
    }

   const getRemainingTime = () => {
       const now = moment(remainingTime, 'DD/MM/YYYY HH:mm:ss')
       const then = moment(questions.deadLine + ':00', 'DD/MM/YYYY HH:mm:ss')
       return moment.utc(moment(then, 'DD/MM/YYYY HH:mm:ss').diff(moment(now, 'DD/MM/YYYY HH:mm:ss'))).format("HH:mm:ss")
   }

    useEffect(() => {
        let secTimer = setInterval( () => {
            setRemainingTime(moment().format("DD/MM/YYYY HH:mm:ss"))
        },1000)
    
        return () => clearInterval(secTimer);
    }, []);
    
    useEffect(() => {
        axios.post(`/courses3/getExam/${examId}`, {
            date: moment().format("DD/MM/YYYY HH:mm")
        }).then(res =>{
            if(res.data.questions){
                setQuestions(res.data)
                setIsAvaible(true)
                res.data.questions.forEach(() => userChoices.push(null))
                setUserChoices(userChoices)
            } else {
                setQuestions(res.data)
                setIsAvaible(false)
            }
        })
        .catch(err => console.log(err))
    }, [])

    const remainingTimeCss = {
        position: screenSize < 500 ? 'relative':'absolute',
        right: 0,
        fontSize: 15,
        fontWeight: 600,
        color: '#555',
        margin: screenSize < 500 ? '0 auto 10px auto':'0'
    }

    const calculateResult = () => {
        let answeredQuestionNumber = 0;
        let correctAnswerNumber = 0;
        userChoices.forEach((el, index) => {
            if(el){
                answeredQuestionNumber += 1;
                if(el == parseInt(questions.questions[index].answer)){
                    correctAnswerNumber += 1;
                }
            }
        });
        let point = Math.round(correctAnswerNumber * 100.0 / userChoices.length);
        let wrongAnswerNumber = answeredQuestionNumber - correctAnswerNumber;
        answeredQuestionNumber = Math.round(answeredQuestionNumber * 100.0 / userChoices.length);
        correctAnswerNumber = Math.round(correctAnswerNumber * 100 / userChoices.length);
        wrongAnswerNumber = Math.round(wrongAnswerNumber * 100 / userChoices.length);
        return {
            answeredQuestionNumber, correctAnswerNumber, point, wrongAnswerNumber
        }
    }

    const saveResults = async () => {
        const { point } = calculateResult();
        await axios.post('courses/addExamResult', {
            point,
            studentId,
            examId
        }).then(res => console.log(res))
        .catch(err => console.log(err))
    }

    return (
        <div className={classes.root}>
            {!isFinished ? (
                isAvaible ? (
                    <Col style={{ width: screenSize < 500 ? '90%':'80%' }}>
                        <Row style={{ position: 'relative' }}>
                            <div style={remainingTimeCss}>Remaining Time: {getRemainingTime()}</div>
                            <div className={classes.title}>{questions.examName}</div>
                        </Row>
                        <QuestionCard 
                            question={questions.questions[index]} 
                            index={index} 
                            setIndex={setIndex} 
                            selectedGlobal={userChoices[index]}
                            setSelectedGlobal={handleSetUserChoices}
                            length={questions.questions.length}
                            saveResults={saveResults}
                        />
                        <Row className={classes.pagination}>
                            <Pagination
                                activePage={index + 1}
                                onPageChange={(e, { activePage }) => setIndex(activePage - 1)}
                                totalPages={questions.questions.length}
                            />
                        </Row>
                    </Col>
                ):(
                    <Card>
                        <Card.Content>
                            <Card.Header textAlign="center">Exam Is Not Avaible</Card.Header>
                        </Card.Content>
                        <Card.Content>
                            <Feed>
                                <Feed.Event>
                                    <Feed.Content>
                                        <Feed.Summary className={classes.summary}>
                                            Exam Start Time: <span className={classes.times}>{questions.startDate}</span>
                                        </Feed.Summary>
                                    </Feed.Content>
                                </Feed.Event>
                                <Feed.Event>
                                    <Feed.Content>
                                        <Feed.Summary className={classes.summary}>
                                            Exam End Time: <span className={classes.times}>{questions.deadLine}</span>
                                        </Feed.Summary>
                                    </Feed.Content>
                                </Feed.Event>
                            </Feed>
                        </Card.Content>
                    </Card>
                )
            ):(
                <Col className={classes.submitPage} style={{ width: screenSize < 500 ? '90%':'30%'}}>
                    <Row className={classes.submitText}>Exam Succesfully Submitted!</Row>
                    <Row className={classes.eachStat} style={{ justifyContent: screenSize < 500 ? 'center':'space-between'}}>
                        <Col className={classes.label} style={{ marginBottom: screenSize < 500 ? '15px':'0'}}>
                            Answered Question
                        </Col>
                        <Col className={classes.stats}>
                            <Progress type="circle" percent={calculateResult().answeredQuestionNumber} format={percent => `${percent}%`} />
                        </Col>
                    </Row>
                    <Divider />
                    <Row className={classes.eachStat} style={{ justifyContent: screenSize < 500 ? 'center':'space-between'}}>
                        <Col className={classes.label} style={{ marginBottom: screenSize < 500 ? '15px':'0'}}>
                            Correct Answer
                        </Col>
                        <Col className={classes.stats}>
                            <Progress type="circle" percent={calculateResult().correctAnswerNumber} strokeColor="green" />
                        </Col>
                    </Row>
                    <Divider />
                    <Row className={classes.eachStat} style={{ justifyContent: screenSize < 500 ? 'center':'space-between'}}>
                        <Col className={classes.label} style={{ marginBottom: screenSize < 500 ? '15px':'0'}}>
                            Wrong Answer
                        </Col>
                        <Col className={classes.stats}>
                            <Progress type="circle" percent={calculateResult().wrongAnswerNumber} strokeColor="red"/>
                        </Col>
                    </Row>
                    <Divider />
                    <Row className={classes.eachStat} style={{ justifyContent: screenSize < 500 ? 'center':'space-between'}}>
                        <Col className={classes.label} style={{ marginBottom: screenSize < 500 ? '15px':'0'}}>
                            Your Exam Point
                        </Col>
                        <Col className={classes.stats}>
                            <Progress type="circle" percent={calculateResult().point} format={percent => `${percent}`} strokeColor="#1e22aa" />
                        </Col>
                    </Row>
                </Col>
            )}
            
        </div>
    )
}

export default ExamPage

const useStyle = makeStyles({
    times: {
        fontSize: 13,
        color: '#ac5353',
    },
    summary: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    root: {
        display: 'flex',
        justifyContent: 'center',
        paddingTop: 20
    },
    title : {
        fontSize: 25,
        fontWeight: 700,
        textAlign: 'center',
        width: '100%'
    },
    pagination: {
        justifyContent: 'center'
    },
    submitText: {
        fontSize: 20,
        marginBottom: 30,
        textAlign: 'center'
    },
    submitPage: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column'
    },
    eachStat: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '80%',
        marginTop: 10,
        marginBottom: 10
    },
    label: {
        fontSize: 18,
    },
    stats: {

    }
})
