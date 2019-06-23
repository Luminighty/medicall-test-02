import React from 'react';
import { TextInput } from 'react-native';

export default class NumberInput extends TextInput {

	constructor(props) {
		super(props);
		this.state = {
			value: ""
		}
		this.validateNumber = this.validateNumber.bind(this);
	}

	validateNumber(e) {
		if (e !== '' && e !== "-") {
			if (isNaN(e.toString()))
				return;
			const num = Number(e);
			const min = this.props.min;
			const max = this.props.max;
			if (min !== undefined && Number(min) > num)
				e = min;
			if (max !== undefined && Number(max) < num)
				e = max;
		}
		this.setState({
			value: e
		});
		if (this.props.onValueChange !== undefined)
			this.props.onValueChange(e);
	}

	render() {
		return ( 
		<TextInput {...this.props} keyboardType = "numeric" onChangeText = {this.validateNumber} value = {this.state.value}/>
		);
	}

}