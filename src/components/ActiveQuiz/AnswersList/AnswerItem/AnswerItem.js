import React from 'react';
import classes from './AnswerItem.module.css';


const AnswerItem = (props) => {

    const cls = [classes.AnswerItem];
    if(props.state) {
        cls.push(classes[props.state]);
    }

    return (
        <div>
            <li 
                className={cls.join(' ')}
                onClick={() => props.onAnswerClick(props.answer.id)}
            >
                { props.answer.text }
            </li>
        </div>
    );
};

export default AnswerItem;
