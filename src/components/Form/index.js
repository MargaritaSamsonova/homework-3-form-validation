import React from 'react';
import './Form.css';
import './assets/bond_approve.jpg';

const Message = ({ nameInput, text }) => (
    <span className={`field__error field-error t-error-${nameInput}`}>
        {text}
    </span>
)

const Field = ({ label, name, children, handlerChange }) => {
    const type = (name === 'password') ? 'password' : 'text';

    return (
        <p className='field'>
            <label htmlFor="firstname" className="field__label">
                <span className="field-label">
                    { label }
                </span>
            </label>
            <input type={type}
                   className={`field__input field-input t-input-${name}`}
                   name={name}
                   onChange={handlerChange}/>
            { children }
        </p>
    )
}


export default class Form extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
            isFirstnameCorrect: false,
            isLastnameCorrect: false,
            isPasswordCorrect: false,
            firstname: '',
            lastname: '',
            password: '',
            isTouchedForm: false,
            isSubmitSuccess: false,
            isAfterSubmit: false
        };

        this.changeInput = this.changeInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }

    correctLoginData = {
        firstname: 'James',
        lastname: 'Bond',
        password: '007'
    }

    fieldsData = [{
            'id': 0,
            'label': 'Имя',
            'name': 'firstname'
        },
        {
            'id': 1,
            'label': 'Фамилия',
            'name': 'lastname'
        },
        {
            'id': 2,
            'label': 'Пароль',
            'name': 'password'
        }];

    errorMessages = {
        empty: {
            'firstname': 'Нужно указать имя',
            'lastname': 'Нужно указать фамилию',
            'password': 'Нужно указать пароль'
        },
        error: {
            'firstname': 'Имя указано не верно',
            'lastname': 'Фамилия указана не верно',
            'password': 'Пароль указан не верно'
        }
    }

    handleSubmit(event) {
        event.preventDefault();

        const isFirstnameCorrect = (event.target.firstname.value === this.correctLoginData.firstname);
        const isLastnameCorrect = (event.target.lastname.value === this.correctLoginData.lastname);
        const isPasswordNameCorrect = (event.target.password.value === this.correctLoginData.password);
        const isSubmitSuccess = isFirstnameCorrect && isLastnameCorrect && isPasswordNameCorrect;

        this.setState({
            isFirstnameCorrect: isFirstnameCorrect,
            isLastnameCorrect: isLastnameCorrect,
            isPasswordCorrect: isPasswordNameCorrect,
            isSubmitSuccess: isSubmitSuccess,
            isTouchedForm: false,
            isAfterSubmit: true
        })
    }

    changeInput(event) {
        const name = event.target.name;
        const value = event.target.value;

        this.setState({
            [name]: value,
            isTouchedForm: true,
            isAfterSubmit: false
        })
    }

    render() {
        const isAfterSubmit = this.state.isAfterSubmit;
        const isSubmitSuccess = this.state.isSubmitSuccess;
        const correctField = {
            'firsname': this.state.isFirstnameCorrect,
            'lastname': this.state.isLastnameCorrect,
            'password': this.state.isPasswordCorrect
        }

        return (
            <div className='app-container'>
                { isSubmitSuccess ? (<img src="/static/media/bond_approve.9943a33d.jpg" alt="bond approve" className="t-bond-image"/>
                ) : ( <form className="form"
                            onSubmit={this.handleSubmit}>
                        <h1>Введите свои данные, агент</h1>
                        {this.fieldsData.map((fieldData, i) => (

                                <Field key={i}
                                       label={fieldData.label}
                                       name={fieldData.name}
                                       handlerChange={this.changeInput}
                                >
                                    <Message key={i} nameInput={fieldData.name}
                                             text={
                                                 (isAfterSubmit && !this.state[fieldData.name].length) ? this.errorMessages.empty[fieldData.name] :
                                                     (isAfterSubmit && !correctField[fieldData.name]) ? this.errorMessages.error[fieldData.name] : ''
                                             }>
                                    </Message>
                                </Field>
                        ))}
                    <div className="form__buttons">
                        <input type="submit"
                               className="button t-submit"
                               value="Проверить"
                        />
                    </div>
                </form>
                )}
            </div>
        )
    }
}

