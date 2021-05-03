import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import db from "../config";
import firebase from "firebase";
import MyHeader from "../components/myHeader";
import { ListItem, Icon } from "react-native-elements";

export default class MyDonationScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      allDonations: [],
      donorId: firebase.auth().currentUser.email,
      donorName: "",
    };
    this.requestRef = null;
  }
  getAllDonations = () => {
    this.requestRef = db
      .collection("all_donations")
      .where("donor_id", "==", this.state.donorId)
      .onSnapshot((snapShot) => {
        var allDonationList = [];
        snapShot.docs.map((doc) => {
          var donation = doc.data();
          donation["doc_id"] = doc.id;
          allDonationList.push(donation);
        });
        this.setState({
          allDonations: allDonationList,
        });
      });
  };

  componentDidMount() {
    this.getAllDonations();
  }

  componentWillUnmount() {
    this.requestRef();
  }

  keyExtractor = (item, index) => index.toString();
  renderItem = ({ item, i }) => {
    return (
      <ListItem
        key={i}
        title={item.item_name}
        subtitle={
          "Requested by: " +
          item.requested_by +
          "\nStatus: " +
          item.request_status
        }
        titleStyle={{ color: "black", fontWeight: "bold" }}
        leftElement={<Icon name="book" type="fontawesome5" color="#f2f50f" />}
        bottomDivider
      />
    );
  };
  render() {
    return (
      <View style={{ flex: 1 }}>
        <MyHeader title="My Donations" navigation={this.props.navigation} />
        <View style={{ flex: 1 }}>
          {this.state.allDonations.length === 0 ? (
            <View style={styles.subContainer}>
              <Text style={{ fontSize: 20 }}>List of all book donations</Text>
            </View>
          ) : (
            <FlatList
              keyExtractor={this.keyExtractor}
              data={this.state.allDonations}
              renderItem={this.renderItem}
            />
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  subContainer: {
    flex: 1,
    fontSize: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: 100,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#4f6",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
  },
});
