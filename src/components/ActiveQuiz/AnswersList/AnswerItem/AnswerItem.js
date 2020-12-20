import React from 'react';
import classes from './AnswerItem.module.css';


const AnswerItem = (props) => {
    return (
        <div>
            <li 
                className={classes.AnswerItem}
                onClick={() => props.onAnswerClick(props.answer.id)}
            >
                { props.answer.text }
            </li>
        </div>
    );
};

export default AnswerItem;
