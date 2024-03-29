import React, {Component} from 'react';
import { View, TextInput, Button, Alert, AppState, StyleSheet, Text, PushNotificationIOS } from 'react-native';
import PushNotification from 'react-native-push-notification';
import NumberInput from './NumberInput';

const styles = StyleSheet.create({
	input: {
		borderWidth: 1,
		borderColor: "black",
		borderStyle: "solid",
		marginBottom: 10
	}
})

export default class App extends Component {
	componentDidMount() {
		AppState.addEventListener('change', this._handleAppStateChange);
		PushNotification.configure({
			onNotification: function (notification) {
				console.log('NOTIFICATION:', notification);

				// process the notification
				let alertData = notification.data;

				console.log("APPSTATE 1:", AppState.currentState);
				if (AppState.currentState !== "active")
					alertData *= 2;
				alert(alertData);
				// required on iOS only (see fetchCompletionHandler docs: https://facebook.github.io/react-native/docs/pushnotificationios.html)
				notification.finish(PushNotificationIOS.FetchResult.NoData);
			},
			requestPermissions: false,
			popInitialNotification: true
		});
	}

	componentWillUnmount() {
		AppState.removeEventListener('change', this._handleAppStateChange);
	}

	_handleAppStateChange = (nextAppState) => {
		this.setState({
			appState: nextAppState
		});
	};

	constructor(props) {
		super(props);
		this.state = {
			"title": "",
			"body": "",
			"data": 3,
			appState: AppState.currentState
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
		console.log("APPSTATE", AppState.currentState);

		PushNotification.localNotificationSchedule({
			title: this.state.title,
			message: this.state.body,
			data: this.state.data,
			date: new Date(Date.now() + (this.state.data * 1000))
		});
	}

	render() {
		return ( 
			<View style = {{marginHorizontal: 20,marginTop: 50}} >
				<Text>Title</Text>
				<TextInput style = {styles.input}onChangeText = {(text) => this.onTextChanged(text, "title")}/>
				<Text>Body</Text>
				<TextInput style = {styles.input} onChangeText = {(text) => this.onTextChanged(text, "body")}/> 
				<Text>Data</Text> 
				<NumberInput min = "3" max = "10" style = {styles.input} onValueChange = {(val) => this.onTextChanged(val, "data")}/> 
				<Button title = "Button" onPress = {this.onButtonPress}/> 
			</View>
		);
	}
}
