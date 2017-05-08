import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {createPost} from '../actions';

class PostsNew extends Component {

    renderField(field) {

        const className = `from-group ${field.meta.touched && field.meta.error
            ? 'has-danger'
            : ''}`

        return (
            <div className={className}>
                <label>
                    <h3>{field.label}</h3>
                </label>
                <input className="form-control" type="text" {...field.input}/>
                <div className="text-help">{field.meta.touched
                        ? field.meta.error
                        : ''}</div>
            </div>
        );
    }

    onSubmit(values) {

        this
            .props
            .createPost(values, () => {
                this
                    .props
                    .history
                    .push('/');
            });
    }

    render() {
        const {handleSubmit} = this.props;
        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field label="Title:" name="title" component={this.renderField}/>
                <Field label="Categories:" name="categories" component={this.renderField}/>
                <Field label="Post Content:" name="content" component={this.renderField}/>
                <button type="submit" className="btn btn-primary">Submit</button>
                <Link className="btn btn-danger" to="/">Cancel</Link>

            </form>
        );
    }
}

function validate(values) {
    const errors = {};

    if (!values.title) {
        errors.title = "Enter a title";
    }
    if (!values.categories) {
        errors.categories = "Please provide categorie";
    }
    if (!values.content) {
        errors.content = "Enter a Content";
    }

    return errors;
}

export default reduxForm({validate, form: 'PostNewForm'})(connect(null, {createPost})(PostsNew));