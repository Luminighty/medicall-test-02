import React, {Component} from 'react';
import {View, TextInput, Button, Alert, StyleSheet, Text} from 'react-native';


const styles = StyleSheet.create({
	input: {
		borderWidth: 1,
		borderColor: "black",
		borderStyle: "solid",
		marginBottom: 10
	}
})

export default class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			"title": "a",
			"body": "b",
			"data": 0
		};
	}

	onTextChanged(text, valueName) {
		this.setState((prevState) => {
			prevState[valueName] = text;
		});
	}

	onButtonPress(state) {
		
		Alert.alert(this.state.title, this.state.body);
	}

	render() {
		return (
			<View style={{marginHorizontal: 20, marginTop: 50}}>
				<Text>Title</Text>
				<TextInput style={styles.input} onChangeText={(text) => this.onTextChanged(text, "title")}/>
				<Text>Body</Text>
				<TextInput style={styles.input} onChangeText={(text) => this.onTextChanged(text, "body")}/>
				<Text>Data</Text>
				<NumberInput min="3" max="10" style={styles.input} onValueChange={(val) => this.onTextChanged(val, "data")}/>
				<Button title="Button" onPress={() => (this.onButtonPress(this.state))}/>
			</View>
		);
	}	
}

class NumberInput extends TextInput {

	constructor(props) {
		super(props);
		this.state = {value:""}
	}

	validateNumber(e, min, max, onValueChange) {
		if(e !== '' && e !== "-") {
			if(isNaN(e.toString()))
				return;
			let num = Number(e);
			if(min !== undefined && Number(min) > num)
				e = min;
			if(max !== undefined && Number(max) < num)
				e = max;
		}
		this.setState({value: e});
		if(onValueChange !== undefined)
			onValueChange(e);
	}

	render() {
		return (
			<TextInput {...this.props} keyboardType="numeric" onChangeText={(text) => this.validateNumber(text, this.props.min, this.props.max, this.props.onValueChange)} value={this.state.value}/>
		);
	}

}