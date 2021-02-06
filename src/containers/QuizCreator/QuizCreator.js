import React, { Component } from 'react';
import {createControl, validate, validateForm} from '../../form/formFramework';
import { connect } from 'react-redux';
import classes from './QuizCreator.module.css';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Select from '../../components/UI/Select/Select';
import { createQuizQuestion, finishCreateQuiz } from '../../store/actions/quizCreatorAction';


function createOptionControl(number) {
	return createControl(
		{
			label: `Вариант ${number}`,
			errorMessage: 'Значение не может быть пустым!',
			id: number
		},
		{ required: true }
	);
}

function createFormControls(params) {
	return {
		questions: createControl(
			{
				label: 'Введите вопрос',
				errorMessage: 'Вопрос не может быть пустым!',
			},
			{ required: true }
		),
		options1: createOptionControl(1),
		options2: createOptionControl(2),
		options3: createOptionControl(3),
		options4: createOptionControl(4),
	};
}

class QuizCreator extends Component {
	state = {
		isFormValid: false,
		formControls: createFormControls(),
		rightAnswerId: 1,
	};

	submitHandler = (e) => {
		e.preventDefault();
	};

	addQuestionHandler = (e) => {
		e.preventDefault();

		const {
			questions,
			options1,
			options2,
			options3,
			options4,
		} = this.state.formControls;

		const questionItem = {
			questions: questions.value,
			id: this.props.quiz.length + 1,
			rightAnswerId: this.state.rightAnswerId,
			answers: [
				{ text: options1.value, id: options1.id },
				{ text: options2.value, id: options2.id },
				{ text: options3.value, id: options3.id },
				{ text: options4.value, id: options4.id },
			],
		};

		this.props.createQuizQuestion(questionItem);

		this.setState({
			isFormValid: false,
			formControls: createFormControls(),
			rightAnswerId: 1,
		});
	};

	createQuizHandler =  (e) => {
		e.preventDefault();

		this.setState({
			isFormValid: false,
			formControls: createFormControls(),
			rightAnswerId: 1,
		});
		this.props.finishCreateQuiz();
	};

	changeHandler = (value, controlName) => {
		const formControls = { ...this.state.formControls };
		const control = { ...formControls[controlName] };

		control.touched = true;
		control.value = value;
		control.valid = validate(control.value, control.validation);

		formControls[controlName] = control;

		this.setState({
			formControls,
			isFormValid: validateForm(formControls),
		});
	};

	selectChangeHandler = (e) => {
		this.setState({
			rightAnswerId: +e.target.value,
		});
	};

	renderControls() {
		return Object.keys(this.state.formControls).map(
			(controlName, index) => {
				const control = this.state.formControls[controlName];

				return (
					<Auxiliary key={controlName + index}>
						<Input
							label={control.label}
							value={control.value}
							valid={control.valid}
							shouldValidate={!!control.validation}
							touched={control.touched}
							errorMessage={control.errorMessage}
							onChange={(e) =>
								this.changeHandler(e.target.value, controlName)
							}
						/>
						{index === 0 ? <hr /> : null}
					</Auxiliary>
				);
			}
		);
	}

	render() {
		const select = (
			<Select
				label='Выберите правильный ответ'
				value={this.state.rightAnswerId}
				onChange={this.selectChangeHandler}
				options={[
					{
						text: 1,
						value: 1,
					},
					{
						text: 2,
						value: 2,
					},
					{
						text: 3,
						value: 3,
					},
					{
						text: 4,
						value: 4,
					},
				]}
			/>
		);
		return (
			<div className={classes.QuizCreator}>
				<div>
					<h1>Создания теста</h1>

					<form onSubmit={this.submitHandler}>
						{this.renderControls()}

						{select}
						<Button
							type='primary'
							onClick={this.addQuestionHandler}
							disabled={!this.state.isFormValid}
						>
							Добавить вопрос
						</Button>

						<Button
							type='success'
							onClick={this.createQuizHandler}
							disabled={this.props.quiz.length === 0}
						>
							Создать тест
						</Button>
					</form>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		quiz:state.create.quiz
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		createQuizQuestion: item => dispatch(createQuizQuestion(item)),
		finishCreateQuiz: () => dispatch(finishCreateQuiz())
	};
};

export default connect(mapStateToProps, mapDispatchToProps) (QuizCreator);
