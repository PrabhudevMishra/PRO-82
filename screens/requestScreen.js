import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import db from "../config";
import firebase from "firebase";
import MyHeader from "../components/myHeader";

export default class RequestScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      userId: firebase.auth().currentUser.email,
      itemsName: "",
      itemsDescription: "",
    };
  }

  createUniqueId() {
    return Math.random().toString(36).substring(7);
  }

  addRequest = (itemsName, itemsDescription) => {
    var userId = this.state.userId;
    var randomRequestId = this.createUniqueId();
    db.collection("requested_items").add({
      user_id: userId,
      items_name: itemsName,
      items_description: itemsDescription,
      request_id: randomRequestId,
    });
    this.setState({
      itemsName: "",
      itemsDescription: "",
    });
    return Alert.alert("Item added Sucessfully.");
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <MyHeader title="Request Items" navigation={this.props.navigation} />
        <KeyboardAvoidingView
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <TextInput
            style={styles.formTextInput}
            placeholder={"Enter Item Name"}
            onChangeText={(txt) => {
              this.setState({
                itemsName: txt,
              });
            }}
            value={this.state.itemsName}
          />

          <TextInput
            style={[styles.formTextInput, { height: 300 }]}
            placeholder={"Item description"}
            multiline={true}
            numberOfLines={8}
            onChangeText={(txt) => {
              this.setState({
                itemsDescription: txt,
              });
            }}
            value={this.state.itemsDescription}
          />

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.addRequest(
                this.state.itemsName,
                this.state.itemsDescription
              );
            }}
          >
            <Text>Request</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  formTextInput: {
    width: "75%",
    height: 35,
    marginTop: 20,
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    alignSelf: "center",
  },
  button: {
    width: "75%",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    marginTop: 20,
    borderRadius: 10,
    backgroundColor: "#956",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
  },
});
