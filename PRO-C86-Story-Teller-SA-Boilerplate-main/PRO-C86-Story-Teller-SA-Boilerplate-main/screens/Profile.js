import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';

SplashScreen.preventAutoHideAsync();

let customFonts = {
	'Bubblegum-Sans': require('../assets/fonts/BubblegumSans-Regular.ttf'),
};

export default class Profile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			fontsLoaded: false,
			isEnabled:false,
			light_theme:true,
			name:''
		};
	}

	toggledSwitch(){
		const previous_state=this.state.isEnabled;
		const theme= !this.state.isEnabled?'dark':'light';
		const auth=getAuth();
		const user=auth.currentUser;

		if (user){
			var updates={};
			updates['users/'+user.uid+'/current_theme']=theme;

			const dbRef=ref(db,'/');
			update (dbRef,updates)
			this.setState({isEnabled:!previous_state,light_theme:previous_state})
		}
	}
	async _loadFontsAsync() {
		await Font.loadAsync(customFonts);
		this.setState({ fontsLoaded: true });
	}

	componentDidMount() {
		this._loadFontsAsync();
	}

	render() {
		if (this.state.fontsLoaded) {
			SplashScreen.hideAsync();
			return (
				<View style={styles.container}>
					<Text>Profile</Text>
					<Switch
					 style={{
						transform:[{scaleX:1.3},{scaleY:1.3}]
					 }}
					 trackColor={{false:'#767577',true:'white'}}
					 onValueChange={()=>this.toggledSwitch()}
					 value={this.state.isEnabled}
					 />
				</View>
			);
		}
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
