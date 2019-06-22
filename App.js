import React, {Component} from 'react';
import {View, TextInput, Button, Alert, AppState, StyleSheet, Text, PushNotificationIOS} from 'react-native';
import PushNotification from 'react-native-push-notification';

const styles = StyleSheet.create({
	input: {
		borderWidth: 1,
		borderColor: "black",
		borderStyle: "solid",
		marginBottom: 10
	}
})

export default class App extends Component {
	state = {appState: AppState.currentState};
	
	componentDidMount() {
		PushNotification.configure({
			onNotification: function(notification) {
				console.log( 'NOTIFICATION:', notification );

				// process the notification
				let alertData = notification.data;
				if(!notification.foreground)
					alertData *= 2;
				alert(alertData);
				console.log("APPSTATE:", AppState.currentState);
				// required on iOS only (see fetchCompletionHandler docs: https://facebook.github.io/react-native/docs/pushnotificationios.html)
				notification.finish(PushNotificationIOS.FetchResult.NoData);
			},
			requestPermissions: true
		});
	}
	constructor(props) {
		super(props);
		this.state = {
			"title": "",
			"body": "",
			"data": 3
		};
		this.onTextChanged = this.onTextChanged.bind(this);
		this.onButtonPress = this.onButtonPress.bind(this);
	}

	onTextChanged(text, valueName) {
		this.setState((prevState) => {
			prevState[valueName] = text;
		});
	}

	onButtonPress() {
		PushNotification.localNotificationSchedule({
			title: this.state.title,
			message: this.state.body,
			data: this.state.data,
			date: new Date(Date.now() + (this.state.data * 1000))
		});
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
		this.validateNumber = this.validateNumber.bind(this);
	}

	validateNumber(e) {
		if(e !== '' && e !== "-") {
			if(isNaN(e.toString()))
				return;
			const num = Number(e);
			const min = this.props.min;
			const max = this.props.max;
			if(min !== undefined && Number(min) > num)
				e = min;
			if(max !== undefined && Number(max) < num)
				e = max;
		}
		this.setState({value: e});
		if(this.props.onValueChange !== undefined)
			this.props.onValueChange(e);
	}

	render() {
		return (
			<TextInput {...this.props} keyboardType="numeric" onChangeText={this.validateNumber} value={this.state.value}/>
		);
	}

}