import { useNavigation } from '@react-navigation/native';
// import { getAuth } from 'firebase/auth';
import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import InfoButton from '../components/InfoButton';
import { palette } from '../assets/Colors';

const Home = () => {
	// const auth = getAuth();
	const navigation = useNavigation();

	const handleSignOut = () => {
		// auth.signOut()
		// .then(() => {
		navigation.replace('Welcome');
		// })
		// .catch((error) => alert(error.message));
	};

	const onPressHandler2 = () => {
		navigation.navigate('CameraScreen');
		// navigation.navigate("RecipeScreen");
	};

	const onPressHandler3 = () => {
		navigation.navigate('HistoryScreen');
	};

	return (
		<ScrollView
			contentContainerStyle={{
				flexGrow: 1,
				justifyContent: 'center',
				alignItems: 'center',
			}}
			style={styles.container}
		>
			<View style={styles.header}>
				<InfoButton style={styles.info} />
				<View style={styles.container0}>
					<Text
						style={{
							fontWeight: 'bold',
							fontSize: 22,
							color: 'white',
						}}
					>
						Email: michaelandrewpaul97@csun.edu
						{/* {auth.currentUser?.email} */}
					</Text>
				</View>
			</View>
			{/* <View style={styles.divider}></View> */}
			<View style={styles.container3}>
				<Text style={styles.welcome}>
					Welcome to {'\n'} Food-Formula!
				</Text>
				<View style={styles.imageContainer}>
					<Image
						source={{
							uri: 'https://www.mcicon.com/wp-content/uploads/2021/02/Technology_Camera_1-copy-8.jpg',
						}}
						style={styles.cameraSelect}
					/>
				</View>
				<TouchableOpacity
					style={styles.touchContainer}
					onPress={onPressHandler2}
				>
					<Text style={styles.scanText}>Click to scan dish!</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.touchContainer}
					onPress={onPressHandler3}
				>
					<Text style={styles.scanText}>View your past recipes</Text>
				</TouchableOpacity>
				<StatusBar style='auto' />
			</View>
			<View style={styles.container2}>
				<TouchableOpacity style={styles.button} onPress={handleSignOut}>
					<Text style={styles.buttonText}>Sign out</Text>
				</TouchableOpacity>
			</View>
			<StatusBar style='auto' />
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	header: {
		flex: 1,
		flexDirection: 'row',
		flexWrap: 'wrap',
		marginTop: -50,
		marginBottom: 40,
		maxHeight: 40,
	},
	container0: {
		marginTop: 68,
		maxWidth: '70%',
	},
	info: {
		alignSelf: 'flex-start',
	},
	container: {
		backgroundColor: palette.blue,
	},
	button: {
		backgroundColor: 'white',
		borderColor: palette.orange,
		borderWidth: 5,
		width: '60%',
		padding: 15,
		paddingHorizontal: 20,
		borderRadius: 10,
		alignItems: 'center',
		marginTop: 20,
		shadowColor: 'black',
		shadowOffset: { width: 0, height: 0 },
		shadowOpacity: 0.3,
		shadowRadius: 10,
	},
	container2: {
		marginTop: 0,
	},
	imageContainer: {
		shadowColor: 'white',
		shadowOffset: { width: 0, height: 0 },
		shadowOpacity: 0.4,
		shadowRadius: 100,
	},
	cameraSelect: {
		width: 200,
		height: 200,
		marginBottom: 40,
		borderWidth: 4,
		overflow: 'hidden',
		borderRadius: 10,
	},
	touchContainer: {
		padding: 15,
		margin: 20,
		width: '100%',
		alignItems: 'center',
		backgroundColor: palette.orange,
		borderRadius: 10,
		shadowColor: 'black',
		shadowOffset: { width: 0, height: 0 },
		shadowOpacity: 0.3,
		shadowRadius: 10,
	},
	scanText: {
		fontSize: 25,
		fontWeight: 'bold',
		color: 'white',
	},
	buttonText: {
		fontSize: 25,
		fontWeight: 'bold',
		color: palette.orange,
	},
	returnContainer: {
		padding: 15,
		margin: 20,
		marginTop: 40,
		width: 300,
		alignItems: 'center',
	},
	returnText: {
		fontSize: 20,
		fontWeight: 'bold',
		color: '#fff',
	},
	container3: {
		alignItems: 'center',
		marginTop: 50,
		width: '70%',
	},
	welcome: {
		fontWeight: 'bold',
		color: palette.orange,
		fontSize: 40,
		marginBottom: 60,
		textAlign: 'center',
	},
});

export default Home;
